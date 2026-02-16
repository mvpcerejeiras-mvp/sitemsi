import React, { useState, useRef, useEffect } from 'react';
import { Site, Credential, InfraLink } from '../types';

interface SiteManagementModalProps {
  site: Site;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedSite: Site) => void;
}

const SiteManagementModal: React.FC<SiteManagementModalProps> = ({ site, isOpen, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'creds' | 'links'>('creds');
  const [chromePassword, setChromePassword] = useState(site.chromeProfilePassword || '');
  const [creds, setCreds] = useState<Credential[]>(site.credentials || []);
  const [links, setLinks] = useState<InfraLink[]>(site.infraLinks || []);
  
  const [newCred, setNewCred] = useState({ label: '', username: '', password: '' });
  const [newLink, setNewLink] = useState({ label: '', url: '', service: 'Other' as InfraLink['service'] });
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  
  // Custom Dropdown State
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Deletion Confirmation States
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: 'cred' | 'link'} | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleAddCred = () => {
    if (!newCred.label || !newCred.username || !newCred.password) return;
    const cred: Credential = { id: Date.now().toString(), ...newCred };
    const updatedCreds = [...creds, cred];
    setCreds(updatedCreds);
    setNewCred({ label: '', username: '', password: '' });
    onUpdate({ ...site, credentials: updatedCreds, chromeProfilePassword: chromePassword });
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'cred') {
      const updatedCreds = creds.filter(c => c.id !== itemToDelete.id);
      setCreds(updatedCreds);
      onUpdate({ ...site, credentials: updatedCreds });
    } else {
      const updatedLinks = links.filter(l => l.id !== itemToDelete.id);
      setLinks(updatedLinks);
      if (editingLinkId === itemToDelete.id) {
        cancelEditLink();
      }
      onUpdate({ ...site, infraLinks: updatedLinks });
    }
    
    setItemToDelete(null);
  };

  const handleAddLink = () => {
    if (!newLink.label || !newLink.url) return;
    
    let updatedLinks: InfraLink[];
    
    if (editingLinkId) {
      // Update existing link
      updatedLinks = links.map(l => l.id === editingLinkId ? { ...l, ...newLink } : l);
    } else {
      // Add new link
      const link: InfraLink = { id: Date.now().toString(), ...newLink };
      updatedLinks = [...links, link];
    }
    
    setLinks(updatedLinks);
    setNewLink({ label: '', url: '', service: 'Other' });
    setEditingLinkId(null);
    onUpdate({ ...site, infraLinks: updatedLinks });
  };

  const handleEditLink = (link: InfraLink) => {
    setEditingLinkId(link.id);
    setNewLink({
      label: link.label,
      url: link.url,
      service: link.service || 'Other'
    });
    // Scroll form into view
    const formElement = document.getElementById('link-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const cancelEditLink = () => {
    setEditingLinkId(null);
    setNewLink({ label: '', url: '', service: 'Other' });
  };

  const saveChromePassword = () => {
    onUpdate({ ...site, chromeProfilePassword: chromePassword });
  };

  const getServiceIcon = (service?: string, size: string = 'text-lg') => {
    switch (service) {
      case 'Github': return <span className={`material-symbols-outlined text-slate-800 dark:text-white ${size}`}>terminal</span>;
      case 'Vercel': return <span className={`material-symbols-outlined text-black dark:text-white ${size}`}>stat_0</span>;
      case 'Supabase': return <span className={`material-symbols-outlined text-emerald-500 ${size}`}>database</span>;
      case 'Hostinger': return <span className={`material-symbols-outlined text-indigo-500 ${size}`}>dns</span>;
      case 'AWS': return <span className={`material-symbols-outlined text-orange-500 ${size}`}>cloud_queue</span>;
      case 'Cloudflare': return <span className={`material-symbols-outlined text-amber-600 ${size}`}>security</span>;
      case 'Firebase': return <span className={`material-symbols-outlined text-yellow-500 ${size}`}>local_fire_department</span>;
      case 'DigitalOcean': return <span className={`material-symbols-outlined text-blue-500 ${size}`}>water_drop</span>;
      case 'Netlify': return <span className={`material-symbols-outlined text-teal-400 ${size}`}>layers</span>;
      default: return <span className={`material-symbols-outlined text-slate-400 ${size}`}>link</span>;
    }
  };

  const services: InfraLink['service'][] = [
    'Supabase', 'Github', 'Vercel', 'Hostinger', 'AWS', 
    'Cloudflare', 'Firebase', 'DigitalOcean', 'Netlify', 'Other'
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 dark:border-border-dark animate-in zoom-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-border-dark flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${site.bgColorClass || 'bg-primary/10'} ${site.iconColorClass || 'text-primary'}`}>
               <span className="material-symbols-outlined text-2xl">{site.iconName || 'language'}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Gerenciar {site.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Segurança e Infraestrutura</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-2 gap-8 border-b border-slate-100 dark:border-border-dark">
          <button 
            onClick={() => setActiveTab('creds')}
            className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'creds' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Credenciais
            {activeTab === 'creds' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('links')}
            className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'links' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Gerenciador de Links
            {activeTab === 'links' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          {activeTab === 'creds' ? (
            <div className="space-y-6">
              {/* Chrome Profile Section */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-border-dark">
                <div className="flex items-center gap-3 mb-4 text-primary">
                  <span className="material-symbols-outlined">browser_updated</span>
                  <h4 className="font-bold">Perfil Google Chrome</h4>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type={showPassword['chrome'] ? "text" : "password"}
                      value={chromePassword}
                      onChange={(e) => setChromePassword(e.target.value)}
                      onBlur={saveChromePassword}
                      placeholder="Senha do Perfil Chrome"
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary transition-all pr-24"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button onClick={() => togglePasswordVisibility('chrome')} className="p-1.5 text-slate-400 hover:text-primary">
                          <span className="material-symbols-outlined text-lg">{showPassword['chrome'] ? 'visibility_off' : 'visibility'}</span>
                        </button>
                        <button onClick={() => handleCopy(chromePassword)} className="p-1.5 text-slate-400 hover:text-primary">
                          <span className="material-symbols-outlined text-lg">content_copy</span>
                        </button>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 italic">* Senha do perfil do Google Chrome onde o site foi criado.</p>
              </div>

              {/* Dynamic Credentials */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">key</span>
                    Outras Credenciais
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{creds.length} SALVAS</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {creds.map(c => (
                    <div key={c.id} className="group flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl hover:border-primary/30 transition-all">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase">{c.label}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">{c.username}</span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">{showPassword[c.id] ? c.password : '••••••••'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => togglePasswordVisibility(c.id)} className="p-2 text-slate-400 hover:text-primary rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">{showPassword[c.id] ? 'visibility_off' : 'visibility'}</span>
                         </button>
                         <button onClick={() => handleCopy(c.password)} className="p-2 text-slate-400 hover:text-primary rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">content_copy</span>
                         </button>
                         <button onClick={() => setItemToDelete({id: c.id, type: 'cred'})} className="p-2 text-slate-400 hover:text-error rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">delete</span>
                         </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Cred Form */}
                <div className="p-5 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30">
                  <p className="text-xs font-bold text-slate-500 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span>
                    ADICIONAR NOVA CREDENCIAL
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      placeholder="Nome (ex: CMS)" 
                      value={newCred.label}
                      onChange={e => setNewCred({...newCred, label: e.target.value})}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-border-dark rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input 
                      type="text" 
                      placeholder="Usuário" 
                      value={newCred.username}
                      onChange={e => setNewCred({...newCred, username: e.target.value})}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-border-dark rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary"
                    />
                    <div className="flex gap-2">
                      <input 
                        type="password" 
                        placeholder="Senha" 
                        value={newCred.password}
                        onChange={e => setNewCred({...newCred, password: e.target.value})}
                        className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-border-dark rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button 
                        onClick={handleAddCred}
                        className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Infra Links Section */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">cloud</span>
                    Serviços de Infraestrutura
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{links.length} VÍNCULOS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {links.map(l => (
                    <div key={l.id} className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-border-dark rounded-2xl hover:border-primary transition-all">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center shrink-0">
                        {getServiceIcon(l.service)}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter truncate">{l.service}</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{l.label}</p>
                        <a href={l.url} target="_blank" rel="noreferrer" className="text-[10px] text-primary hover:underline truncate block">
                          Acessar Dashboard
                        </a>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2">
                        <button 
                          onClick={() => handleEditLink(l)}
                          className="w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all"
                          title="Editar link"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button 
                          onClick={() => setItemToDelete({id: l.id, type: 'link'})}
                          className="w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-error shadow-lg hover:bg-error hover:text-white transition-all"
                          title="Excluir link"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Empty state */}
                  {links.length === 0 && (
                    <div className="sm:col-span-2 py-10 text-center border-2 border-dashed border-slate-100 dark:border-border-dark rounded-3xl">
                        <span className="material-symbols-outlined text-4xl text-slate-200 dark:text-slate-700 mb-2">link_off</span>
                        <p className="text-sm text-slate-400">Nenhum link de infraestrutura configurado.</p>
                    </div>
                  )}
                </div>

                {/* Add/Edit Link Form */}
                <div id="link-form" className={`p-6 border border-dashed rounded-3xl transition-colors ${editingLinkId ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-border-dark bg-slate-50/50 dark:bg-slate-900/30'}`}>
                  <p className="text-xs font-bold text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <span className="material-symbols-outlined text-sm">{editingLinkId ? 'edit' : 'add_link'}</span>
                    {editingLinkId ? `Editando Vínculo: ${newLink.label}` : 'Vincular Novo Serviço'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative" ref={dropdownRef}>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Ícone / Serviço</label>
                      
                      {/* Custom Dropdown Trigger */}
                      <button 
                        type="button"
                        onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                        className="w-full flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50 h-[42px]"
                      >
                        <div className="w-6 h-6 rounded-md bg-slate-50 dark:bg-slate-900 flex items-center justify-center shrink-0">
                          {getServiceIcon(newLink.service, 'text-base')}
                        </div>
                        <span className="flex-1 text-left font-semibold text-slate-700 dark:text-slate-200">{newLink.service}</span>
                        <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                      </button>

                      {/* Dropdown Menu */}
                      {isServiceDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto scrollbar-hide">
                          {services.map(service => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => {
                                setNewLink({...newLink, service});
                                setIsServiceDropdownOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-xs hover:bg-primary/10 transition-colors text-left ${newLink.service === service ? 'bg-primary/5 border-l-2 border-primary' : ''}`}
                            >
                              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                {getServiceIcon(service, 'text-base')}
                              </div>
                              <span className={`font-semibold ${newLink.service === service ? 'text-primary' : 'text-slate-700 dark:text-slate-200'}`}>
                                {service}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nome de Exibição</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Repo Principal" 
                        value={newLink.label}
                        onChange={e => setNewLink({...newLink, label: e.target.value})}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-primary h-[42px]"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">URL do Link</label>
                      <div className="flex gap-3">
                        <input 
                          type="url" 
                          placeholder="https://..." 
                          value={newLink.url}
                          onChange={e => setNewLink({...newLink, url: e.target.value})}
                          className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-primary h-[42px]"
                        />
                        <div className="flex gap-2">
                          {editingLinkId && (
                            <button 
                              onClick={cancelEditLink}
                              className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors h-[42px]"
                            >
                              Cancelar
                            </button>
                          )}
                          <button 
                            onClick={handleAddLink}
                            className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 h-[42px] whitespace-nowrap"
                          >
                            {editingLinkId ? 'Salvar Alterações' : 'Vincular'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Local Deletion Confirmation Overlay */}
        {itemToDelete && (
          <div className="absolute inset-0 z-[150] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-border-dark max-w-sm w-full animate-in zoom-in duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl">delete_forever</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Excluir {itemToDelete.type === 'cred' ? 'Credencial' : 'Link'}?</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                  Tem certeza que deseja remover este item? Esta ação removerá o acesso permanentemente deste painel.
                </p>
                <div className="flex w-full gap-3">
                  <button 
                    onClick={() => setItemToDelete(null)}
                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 py-3 bg-error hover:bg-error/90 text-white font-bold rounded-2xl shadow-lg shadow-error/20 transition-all active:scale-95"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-border-dark flex justify-end">
           <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
           >
            Concluído
           </button>
        </div>
      </div>
    </div>
  );
};

export default SiteManagementModal;