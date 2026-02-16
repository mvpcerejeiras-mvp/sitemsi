import React, { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';

interface SettingsViewProps {
  categories?: string[];
  onAddCategory?: (category: string) => void;
  onDeleteCategory?: (category: string) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ categories = [], onAddCategory, onDeleteCategory }) => {
  const { settings, updateSettings, loading } = useSettings();

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    org_name: '',
    support_email: '',
    timezone: '',
    maintenance_mode: false,
    logo_url: ''
  });

  // Load settings into form state
  useEffect(() => {
    if (settings) {
      setFormData({
        org_name: settings.org_name || '',
        support_email: settings.support_email || '',
        timezone: settings.timezone || 'Brasilia (GMT-3)',
        maintenance_mode: settings.maintenance_mode || false,
        logo_url: settings.logo_url || ''
      });
    }
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setShowSuccess(false);
      setErrorMsg(null);

      const result = await updateSettings({
        org_name: formData.org_name,
        support_email: formData.support_email,
        timezone: formData.timezone,
        maintenance_mode: formData.maintenance_mode,
        logo_url: formData.logo_url
      });

      // Verificação defensiva se result for undefined (caso o hook falhe silenciosamente)
      if (!result) {
        throw new Error("Falha interna ao atualizar configurações.");
      }

      const { success, error } = result;

      if (success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setErrorMsg(error || 'Erro ao salvar configurações.');
      }
    } catch (err: any) {
      console.error("Erro crítico ao salvar:", err);
      setErrorMsg("Ocorreu um erro inesperado. Tente recarregar a página.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && onAddCategory) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  if (loading && !settings) {
    return <div className="p-8 text-center text-slate-500">Carregando configurações...</div>;
  }

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

        {errorMsg && (
          <div className="p-4 bg-error/10 border border-error/20 text-error rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <span className="material-symbols-outlined">error</span>
            <span className="text-sm font-bold">{errorMsg}</span>
          </div>
        )}

        <div className="space-y-6">

          {/* Gerenciamento de Categorias */}
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
                    name="org_name"
                    value={formData.org_name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email de Suporte</label>
                  <input
                    type="email"
                    name="support_email"
                    value={formData.support_email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Logo URL Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Logo URL</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    name="logo_url"
                    placeholder="https://exemplo.com/logo.png"
                    value={formData.logo_url}
                    onChange={handleInputChange}
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  />
                  {formData.logo_url && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
                      <img src={formData.logo_url} alt="Logo Preview" className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">Cole a URL direta da imagem do logo do sistema.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Timezone Padrão</label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
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
                    name="maintenance_mode"
                    className="sr-only peer"
                    checked={formData.maintenance_mode}
                    onChange={handleInputChange}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => window.location.reload()}
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