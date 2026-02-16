import React from 'react';

const AnalyticsView: React.FC = () => {
    return (
        <div className="flex-1 overflow-auto p-8 bg-slate-50 dark:bg-background-dark h-full">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Análises</h2>
                    <p className="text-slate-500 dark:text-[#92adc9]">Visão geral do tráfego e engajamento dos sites.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Visitas Totais (Mês)</p>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">124.5K</span>
                            <span className="text-sm font-bold text-success flex items-center mb-1">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                12%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Usuários Únicos</p>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">45.2K</span>
                            <span className="text-sm font-bold text-success flex items-center mb-1">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                5%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tempo Médio</p>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">4m 12s</span>
                            <span className="text-sm font-bold text-error flex items-center mb-1">
                                <span className="material-symbols-outlined text-sm">trending_down</span>
                                1%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Taxa de Rejeição</p>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">42%</span>
                            <span className="text-sm font-bold text-success flex items-center mb-1">
                                <span className="material-symbols-outlined text-sm">check</span>
                                Bom
                            </span>
                        </div>
                    </div>
                </div>

                {/* Charts Section Mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Bar Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                        <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Acessos por Dia</h3>
                        <div className="h-64 flex items-end justify-between gap-2 px-2">
                            {[35, 50, 45, 70, 60, 85, 95, 75, 60, 45, 55, 65, 80, 70].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                                    <div
                                        className="w-full bg-primary/20 group-hover:bg-primary transition-all duration-300 rounded-t-md relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                            {h * 15} visitas
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                            <span>01 Fev</span>
                            <span>07 Fev</span>
                            <span>14 Fev</span>
                            <span>Hoje</span>
                        </div>
                    </div>

                    {/* Top Categories List */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                        <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Categorias Populares</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-slate-700 dark:text-slate-200">Church</span>
                                    <span className="text-slate-900 dark:text-white">45%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                    <div className="bg-rose-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-slate-700 dark:text-slate-200">Finanças</span>
                                    <span className="text-slate-900 dark:text-white">30%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-slate-700 dark:text-slate-200">Sistemas</span>
                                    <span className="text-slate-900 dark:text-white">15%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-slate-700 dark:text-slate-200">Projetos</span>
                                    <span className="text-slate-900 dark:text-white">10%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
