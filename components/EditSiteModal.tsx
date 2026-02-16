import React, { useState, useEffect } from 'react';
import { Site, SiteCategory, SiteStatus } from '../types';

interface EditSiteModalProps {
    site: Site;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (site: Site) => void;
    categories: SiteCategory[];
}

const EditSiteModal: React.FC<EditSiteModalProps> = ({ site, isOpen, onClose, onUpdate, categories }) => {
    const [formData, setFormData] = useState<Partial<Site>>({ ...site });

    useEffect(() => {
        setFormData({ ...site });
    }, [site]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({
            ...site,
            ...formData as Site
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white dark:bg-surface-dark rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-200 dark:border-border-dark animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Editar Site</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Site</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-slate-50 dark:bg-background-dark border border-slate-300 dark:border-border-dark rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
                            <select
                                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-300 dark:border-border-dark rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value as SiteCategory })}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                            <select
                                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-300 dark:border-border-dark rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as SiteStatus })}
                            >
                                <option value="Online">Online</option>
                                <option value="Active">Active</option>
                                <option value="Manutenção">Manutenção</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL da Imagem/Logo</label>
                        <input
                            type="url"
                            className="w-full bg-slate-50 dark:bg-background-dark border border-slate-300 dark:border-border-dark rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white"
                            placeholder="https://..."
                            value={formData.logoUrl}
                            onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL do Site</label>
                        <input
                            required
                            type="url"
                            className="w-full bg-slate-50 dark:bg-background-dark border border-slate-300 dark:border-border-dark rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white"
                            value={formData.url}
                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição</label>
                        <textarea
                            className="w-full bg-slate-50 dark:bg-background-dark border border-slate-300 dark:border-border-dark rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white resize-none h-20"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSiteModal;