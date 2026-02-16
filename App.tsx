import React, { useState, useEffect } from 'react';
import { Site, ViewMode, AdminSubView } from './types';
import { useSites } from './hooks/useSites';
import { useCategories } from './hooks/useCategories';
import { useSettings } from './hooks/useSettings';
import PortalView from './components/PortalView';
import AdminView from './components/AdminView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import AddSiteModal from './components/AddSiteModal';
import AuthView from './components/AuthView';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('msi_auth_token') === 'valid';
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('msi_auth_token', 'valid');
    } else {
      localStorage.removeItem('msi_auth_token');
    }
  }, [isAuthenticated]);

  // Integração com Supabase via Hooks
  const { sites, addSite, updateSite, deleteSite, loading: sitesLoading } = useSites();
  const { categories, addCategory, deleteCategory, loading: categoriesLoading } = useCategories();
  const { settings } = useSettings();

  const [viewMode, setViewMode] = useState<ViewMode>('portal');
  const [adminSubView, setAdminSubView] = useState<AdminSubView>('sites');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddCategory = (category: string) => {
    addCategory(category);
  };

  const handleDeleteCategory = (category: string) => {
    deleteCategory(category);
  };

  const handleAddSite = (newSite: Site) => {
    addSite(newSite);
  };

  const handleDeleteSite = (id: string) => {
    deleteSite(id);
  };

  const handleUpdateSite = (updatedSite: Site) => {
    updateSite(updatedSite);
  };

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Se não estiver autenticado, mostra apenas a tela de Login
  if (!isAuthenticated) {
    return <AuthView onLogin={() => setIsAuthenticated(true)} settings={settings} />;
  }

  const renderLogo = (size: 'small' | 'large' = 'large') => {
    if (settings?.logo_url) {
      return (
        <img
          src={settings.logo_url}
          alt={settings.org_name || "Logo"}
          className={`${size === 'small' ? 'h-8' : 'h-10'} w-auto object-contain rounded-lg`}
        />
      );
    }
    return (
      <div className={`flex items-center justify-center bg-primary rounded-lg ${size === 'small' ? 'p-1.5' : 'p-2'} text-white`}>
        <span className={`material-symbols-outlined ${size === 'small' ? 'text-xl' : 'text-2xl'}`}>
          {viewMode === 'portal' ? 'hub' : 'rocket_launch'}
        </span>
      </div>
    );
  };

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-x-hidden ${viewMode === 'admin' ? 'lg:flex-row' : ''}`}>

      {/* Sidebar - Only visible in Admin Mode */}
      {viewMode === 'admin' && (
        <aside className="hidden lg:flex w-72 border-r border-slate-200 dark:border-border-dark flex-col bg-white dark:bg-background-dark shrink-0 h-screen sticky top-0">
          <div className="p-6 flex items-center gap-3">
            {renderLogo()}
            <div>
              <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">{settings?.org_name || 'Sites MSI'}</h1>
              <p className="text-xs text-slate-500 dark:text-[#92adc9]">Painel Admin v2.4</p>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            <button onClick={() => setViewMode('portal')} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-border-dark rounded-lg transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-medium">Voltar ao Portal</span>
            </button>

            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu Principal</p>
            </div>

            <button
              onClick={() => setAdminSubView('sites')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${adminSubView === 'sites' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-border-dark'}`}
            >
              <span className="material-symbols-outlined">language</span>
              <span className="text-sm font-medium">Gerenciar Sites</span>
            </button>
            <button
              onClick={() => setAdminSubView('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${adminSubView === 'analytics' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-border-dark'}`}
            >
              <span className="material-symbols-outlined">analytics</span>
              <span className="text-sm font-medium">Análises</span>
            </button>
            <button
              onClick={() => setAdminSubView('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${adminSubView === 'settings' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-border-dark'}`}
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">Configurações</span>
            </button>
          </nav>
          <div className="p-4 border-t border-slate-200 dark:border-border-dark">
            <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-surface-dark rounded-xl">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-border-dark bg-cover bg-center shrink-0" style={{ backgroundImage: "url('https://i.pravatar.cc/150?u=alex')" }}></div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">Alex Murphy</p>
                <p className="text-xs text-slate-500 truncate">Admin do Sistema</p>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-slate-400 hover:text-error transition-colors"
                title="Sair"
              >
                <span className="material-symbols-outlined text-xl">logout</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Wrapper */}
      <div className="layout-container flex h-full grow flex-col">

        {/* Header */}
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-solid border-slate-200 dark:border-slate-800 px-6 lg:px-10 py-3">
          <div className="flex items-center justify-between max-w-[1440px] mx-auto gap-8 w-full">

            {/* Branding (Only in Portal Mode) */}
            {viewMode === 'portal' && (
              <div className="flex items-center gap-3">
                {renderLogo()}
                <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight hidden sm:block">{settings?.org_name || 'Sites MSI'}</h2>
              </div>
            )}

            {/* Branding (Mobile Admin Mode) */}
            {viewMode === 'admin' && (
              <div className="lg:hidden flex items-center gap-3">
                {renderLogo('small')}
              </div>
            )}

            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <label className="relative flex w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-500 outline-none transition-shadow"
                  placeholder={viewMode === 'portal' ? "Pesquisar sites ou sistemas..." : "Pesquisar em todos os sites..."}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {viewMode === 'portal' && (
                <nav className="hidden lg:flex items-center gap-6 mr-4">
                  <button onClick={() => setViewMode('portal')} className="text-sm font-semibold text-primary">Dashboard</button>
                  <button className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Relatórios</button>
                  <button
                    onClick={() => {
                      setViewMode('admin');
                      setAdminSubView('settings');
                    }}
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                  >
                    Configurações
                  </button>
                </nav>
              )}

              <div className="flex gap-2 items-center">
                {/* Admin Add Button - Only show on Sites view */}
                {viewMode === 'admin' && adminSubView === 'sites' && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hidden sm:flex bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold items-center gap-2 transition-all mr-2"
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    Adicionar
                  </button>
                )}

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">{darkMode ? 'light_mode' : 'dark_mode'}</span>
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-error/10 hover:text-error transition-colors"
                  title="Sair"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className={`flex-1 flex flex-col ${viewMode === 'admin' ? 'overflow-hidden' : ''}`}>
          {viewMode === 'portal' ? (
            <PortalView
              sites={filteredSites}
              onAddClick={() => setIsModalOpen(true)}
              onUpdateSite={handleUpdateSite}
              categories={categories}
            />
          ) : (
            <>
              {adminSubView === 'sites' && (
                <AdminView
                  sites={filteredSites}
                  onAddClick={() => setIsModalOpen(true)}
                  onDeleteClick={handleDeleteSite}
                  onUpdateClick={handleUpdateSite}
                  categories={categories}
                />
              )}
              {adminSubView === 'analytics' && <AnalyticsView />}
              {adminSubView === 'settings' && (
                <SettingsView
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              )}
            </>
          )}
        </main>

        {/* Floating Add Button (Mobile) - Only on Portal or Admin Sites */}
        {((viewMode === 'portal') || (viewMode === 'admin' && adminSubView === 'sites')) && (
          <div className="fixed bottom-6 right-6 md:hidden z-40">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-3xl">add</span>
            </button>
          </div>
        )}

        {/* Footer (Portal only) */}
        {viewMode === 'portal' && (
          <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">© 2024 Sites MSI • Todos os direitos reservados.</p>
          </footer>
        )}
      </div>

      <AddSiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSite}
        categories={categories}
      />
    </div>
  );
};

export default App;