import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SystemSettings {
    id: string;
    org_name: string;
    logo_url?: string;
    support_email?: string;
    timezone: string;
    maintenance_mode: boolean;
}

export const useSettings = () => {
    const [settings, setSettings] = useState<SystemSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('system_settings')
                .select('*')
                .limit(1)
                .single();

            if (error) {
                // Se não encontrar (PGRST116), cria um padrão
                if (error.code === 'PGRST116') {
                    const defaultSettings = { org_name: 'MSI Global' };
                    const { data: newData, error: insertError } = await supabase
                        .from('system_settings')
                        .insert([defaultSettings])
                        .select()
                        .single();

                    if (insertError) throw insertError;
                    setSettings(newData);
                } else {
                    throw error;
                }
            } else {
                setSettings(data);
            }
        } catch (err: any) {
            console.error('Erro ao buscar configurações:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings: Partial<SystemSettings>) => {
        try {
            if (!settings?.id) return { success: false, error: "Configurações não carregadas." };

            const { error } = await supabase
                .from('system_settings')
                .update(newSettings)
                .eq('id', settings.id);

            if (error) throw error;

            // Atualiza estado local
            setSettings(prev => prev ? { ...prev, ...newSettings } : null);
            return { success: true };
        } catch (err: any) {
            console.error('Erro ao atualizar configurações:', err);
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return { settings, loading, error, updateSettings, refreshSettings: fetchSettings };
};
