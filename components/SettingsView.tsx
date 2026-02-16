import React, { useState } from 'react';

interface SettingsViewProps {
  categories?: string[];
  onAddCategory?: (category: string) => void;
  onDeleteCategory?: (category: string) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ categories = [], onAddCategory, onDeleteCategory }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // Form State
  const [orgName, setOrgName] = useState('MSI Global');
  const [supportEmail, setSupportEmail] = useState('support@msi.org');
  const [timezone, setTimezone] = useState('Brasilia (GMT-3)');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    setIsSaving(true);
    setShowSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && onAddCategory) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50 dark:bg-background-dark h-full">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Configurações</h2>
          <p className="text-slate-500 dark:text-[#92adc9]">Gerencie as preferências globais do sistema e permissões.</p>
        </div>

        {showSuccess && (
          <div className="p-4 bg-success/10 border border-success/20 text-success rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="text-sm font-bold">Configurações salvas com sucesso!</span>
          </div>
        )}

        <div className="space-y-6">

          {/* Gerenciamento de Categorias - NOVO */}
          {onAddCategory && onDeleteCategory && (
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Categorias de Sites</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gerencie as categorias disponíveis para classificação dos sites.</p>
              </div>
              <div className="p-6 space-y-6">
                <form onSubmit={handleAddCategorySubmit} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Nova Categoria..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={!newCategory.trim()}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Adicionar
                  </button>
                </form>

                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <div key={cat} className="group relative bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 pr-2">
                      {cat}
                      {cat !== 'Todos' && (
                        <button
                          onClick={() => onDeleteCategory(cat)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-error hover:bg-error/10 transition-colors"
                          title={`Excluir ${cat}`}
                        >
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* General Settings */}
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Geral</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Informações básicas da organização.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome da Organização</label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email de Suporte</label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Timezone Padrão</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Brasilia (GMT-3)</option>
                  <option>UTC</option>
                  <option>New York (EST)</option>
                </select>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Status do Sistema</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Controle de acesso e manutenção.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Modo de Manutenção</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Impede o acesso de usuários não administrativos ao portal.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Notificações por Email</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Receber alertas sobre status de sites offline.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="px-6 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center gap-2 min-w-[160px] justify-center"
            >
              {isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;