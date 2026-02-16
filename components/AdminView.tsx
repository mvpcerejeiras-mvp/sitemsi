import React, { useState } from 'react';
import { Site, SiteCategory } from '../types';
import EditSiteModal from './EditSiteModal';

interface AdminViewProps {
  sites: Site[];
  onAddClick: () => void;
  onDeleteClick: (id: string) => void;
  onUpdateClick: (updatedSite: Site) => void;
  categories: SiteCategory[];
}

const AdminView: React.FC<AdminViewProps> = ({ sites, onAddClick, onDeleteClick, onUpdateClick, categories }) => {
  const [siteToDelete, setSiteToDelete] = useState<Site | null>(null);
  const [siteToEdit, setSiteToEdit] = useState<Site | null>(null);
  const [confirmName, setConfirmName] = useState('');

  const handleDeleteConfirm = () => {
    if (siteToDelete && confirmName === siteToDelete.name) {
      onDeleteClick(siteToDelete.id);
      setSiteToDelete(null);
      setConfirmName('');
    }
  };

  const closeDeleteModal = () => {
    setSiteToDelete(null);
    setConfirmName('');
  };

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50 dark:bg-background-dark h-full relative">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Gerenciar Sites</h2>
              <p className="text-slate-500 dark:text-[#92adc9]">Monitoramento centralizado e controle administrativo para todas as suas propriedades web.</p>
            </div>
            <button
              onClick={onAddClick}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined">add</span>
              Novo Site
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm text-slate-500 dark:text-[#92adc9] font-medium uppercase tracking-wider">Total Sites</p>
              <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{sites.length}</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">language</span>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm text-slate-500 dark:text-[#92adc9] font-medium uppercase tracking-wider">Status Ativo</p>
              <h3 className="text-3xl font-bold mt-1 text-success">
                {sites.filter(s => s.status === 'Active' || s.status === 'Online').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-success">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm text-slate-500 dark:text-[#92adc9] font-medium uppercase tracking-wider">Problemas</p>
              <h3 className="text-3xl font-bold mt-1 text-error">
                {sites.filter(s => s.status === 'Inactive' || s.status === 'Manutenção').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center text-error">
              <span className="material-symbols-outlined">warning</span>
            </div>
          </div>
        </div>

        {/* Main Data Table Container */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-border-dark/50 border-b border-slate-200 dark:border-border-dark">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92adc9] uppercase tracking-wider w-16">Logo</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92adc9] uppercase tracking-wider">Nome do Site</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92adc9] uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92adc9] uppercase tracking-wider">URL Endpoint</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92adc9] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92adc9] uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
                {sites.map((site) => (
                  <tr key={site.id} className="hover:bg-slate-50 dark:hover:bg-border-dark/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-border-dark flex items-center justify-center overflow-hidden border border-slate-200 dark:border-border-dark">
                        {site.logoUrl ? (
                          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${site.logoUrl}')` }}></div>
                        ) : (
                          <span className="material-symbols-outlined text-slate-400">{site.iconName || 'image'}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{site.name}</span>
                        <span className="text-xs text-slate-400">ID: {site.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-slate-100 dark:bg-border-dark text-slate-600 dark:text-slate-300">
                        {site.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a href={site.url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                        {site.url.replace('https://', '')}
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 ${(site.status === 'Active' || site.status === 'Online') ? 'text-success' : 'text-error'}`}>
                        <span className={`w-2 h-2 rounded-full ${(site.status === 'Active' || site.status === 'Online') ? 'bg-success' : 'bg-error'}`}></span>
                        <span className="text-sm font-medium">{site.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSiteToEdit(site)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Editar"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          onClick={() => {
                            setSiteToDelete(site);
                            setConfirmName('');
                          }}
                          className="p-2 text-slate-400 hover:text-error hover:bg-error/10 rounded-lg transition-all"
                          title="Excluir"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Mockup */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-border-dark flex items-center justify-between bg-white dark:bg-surface-dark">
            <p className="text-xs text-slate-500 dark:text-[#92adc9]">Mostrando {sites.length} resultados</p>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg border border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-border-dark transition-colors disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">1</button>
              <button className="p-1.5 rounded-lg border border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-border-dark transition-colors" disabled>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {siteToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeDeleteModal}></div>
          <div className="relative bg-white dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-200 dark:border-border-dark animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl">warning</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Excluir Site Permanentemente?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Esta ação excluirá todos os dados de <span className="font-bold text-slate-700 dark:text-slate-200">"{siteToDelete.name}"</span> e não pode ser desfeita.
              </p>

              <div className="w-full mb-6">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 text-left">
                  Digite o nome do site para confirmar:
                </label>
                <input
                  type="text"
                  placeholder={siteToDelete.name}
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-error transition-all text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex w-full gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={confirmName !== siteToDelete.name}
                  className="flex-1 py-3 bg-error hover:bg-error/90 text-white font-bold rounded-xl shadow-lg shadow-error/20 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                >
                  Excluir permanentemente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Site Modal */}
      {siteToEdit && (
        <EditSiteModal
          site={siteToEdit}
          isOpen={!!siteToEdit}
          onClose={() => setSiteToEdit(null)}
          onUpdate={(updated) => {
            onUpdateClick(updated);
            setSiteToEdit(null);
          }}
          categories={categories}
        />
      )}
    </div>
  );
};

export default AdminView;