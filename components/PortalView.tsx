import React, { useState } from 'react';
import { Site, SiteCategory } from '../types';

import SiteManagementModal from './SiteManagementModal';

interface PortalViewProps {
  sites: Site[];
  onAddClick: () => void;
  onUpdateSite: (updatedSite: Site) => void;
  categories: SiteCategory[];
}

const PortalView: React.FC<PortalViewProps> = ({ sites, onAddClick, onUpdateSite, categories }) => {
  const [activeCategory, setActiveCategory] = useState<SiteCategory>('Todos');
  const [selectedSiteForManage, setSelectedSiteForManage] = useState<Site | null>(null);

  const filteredSites = activeCategory === 'Todos'
    ? sites
    : sites.filter(site => site.category === activeCategory);

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Bem-vindo ao Central de Sites</h1>
        <p className="text-slate-600 dark:text-slate-400">Acesse rapidamente as ferramentas e portais da organização.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all duration-200 
                ${isActive
                  ? 'bg-primary text-white active:scale-95 shadow-md shadow-primary/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary'
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Site Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSites.map((site) => (
          <div key={site.id} className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300">
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 ${site.bgColorClass || 'bg-slate-100 dark:bg-slate-800'} rounded-xl flex items-center justify-center ${site.iconColorClass || 'text-slate-500'} group-hover:scale-110 transition-transform`}>
                  {site.logoUrl ? (
                    <div
                      className="w-full h-full rounded-xl bg-cover bg-center"
                      style={{ backgroundImage: `url('${site.logoUrl}')` }}
                    />
                  ) : (
                    <span className="material-symbols-outlined text-3xl">{site.iconName || 'language'}</span>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {(site.status === 'Manutenção' || site.status === 'Inactive') && (
                    <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-[10px] uppercase font-bold px-2 py-1 rounded">
                      Manutenção
                    </span>
                  )}
                  {(site.status === 'Online' || site.status === 'Active') && (
                    <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] uppercase font-bold px-2 py-1 rounded">
                      Online
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{site.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
                {site.description}
              </p>
              <div className="mt-auto flex flex-col gap-2">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all active:scale-95"
                >
                  <span>Acessar site</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                <button
                  onClick={() => setSelectedSiteForManage(site)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2.5 rounded-lg transition-all active:scale-95 text-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  <span>Gerenciar</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Site Card */}
        <div
          onClick={onAddClick}
          className="group flex flex-col bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden hover:bg-white dark:hover:bg-slate-900 hover:border-primary transition-all duration-300 cursor-pointer"
        >
          <div className="p-6 flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all shadow-sm mb-4">
              <span className="material-symbols-outlined text-4xl">add</span>
            </div>
            <h3 className="text-lg font-bold text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Adicionar Novo Site</h3>
            <p className="text-sm text-slate-400 mt-2">Configurar novo atalho no dashboard</p>
          </div>
        </div>
      </div>

      {/* Site Management Modal */}
      {selectedSiteForManage && (
        <SiteManagementModal
          site={selectedSiteForManage}
          isOpen={!!selectedSiteForManage}
          onClose={() => setSelectedSiteForManage(null)}
          onUpdate={(updatedSite) => {
            onUpdateSite(updatedSite);
            setSelectedSiteForManage(updatedSite);
          }}
        />
      )}
    </div>
  );
};

export default PortalView;
