import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Site } from '../types';

export const useSites = () => {
    const [sites, setSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);

    const mapSupabaseDataToSite = (data: any[]): Site[] => {
        return data.map(item => ({
            id: item.id,
            name: item.name,
            url: item.url,
            description: item.description,
            category: item.category_name, // Mapeando da coluna category_name
            status: item.status,
            logoUrl: item.logo_url,
            // New fields
            chromeProfilePassword: item.chrome_profile_password,
            credentials: item.credentials || [],
            infraLinks: item.infra_links || [],
            iconName: 'public', // Default
            bgColorClass: 'bg-slate-100 dark:bg-slate-800', // Default
            iconColorClass: 'text-slate-600' // Default
        }));
    };

    const fetchSites = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('sites')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                setSites(mapSupabaseDataToSite(data));
            }
        } catch (error) {
            console.error('Erro ao buscar sites:', error);
        } finally {
            setLoading(false);
        }
    };

    const addSite = async (site: Site) => {
        try {
            const { error } = await supabase.from('sites').insert([{
                name: site.name,
                url: site.url,
                description: site.description,
                category_name: site.category,
                logo_url: site.logoUrl,
                status: site.status,
                // New fields
                chrome_profile_password: site.chromeProfilePassword,
                credentials: site.credentials,
                infra_links: site.infraLinks
            }]);

            if (error) throw error;
            await fetchSites();
        } catch (error) {
            console.error('Erro ao adicionar site:', error);
        }
    };

    const updateSite = async (site: Site) => {
        try {
            const { error } = await supabase.from('sites').update({
                name: site.name,
                url: site.url,
                description: site.description,
                category_name: site.category,
                logo_url: site.logoUrl,
                status: site.status,
                // New fields
                chrome_profile_password: site.chromeProfilePassword,
                credentials: site.credentials,
                infra_links: site.infraLinks
            }).eq('id', site.id);

            if (error) throw error;
            await fetchSites();
        } catch (error) {
            console.error('Erro ao atualizar site:', error);
        }
    };

    const deleteSite = async (id: string) => {
        try {
            const { error } = await supabase.from('sites').delete().eq('id', id);
            if (error) throw error;
            await fetchSites();
        } catch (error) {
            console.error('Erro ao deletar site:', error);
        }
    };

    useEffect(() => {
        fetchSites();
    }, []);

    return { sites, loading, addSite, updateSite, deleteSite, refreshSites: fetchSites };
};
