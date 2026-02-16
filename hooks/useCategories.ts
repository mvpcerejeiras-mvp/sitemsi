import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useCategories = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('categories')
                .select('name')
                .order('id', { ascending: true }); // Assumindo ordem de criação ou adicionar ordem explicita

            if (error) throw error;

            if (data) {
                setCategories(data.map(cat => cat.name));
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (name: string) => {
        try {
            const { error } = await supabase.from('categories').insert([{ name }]);
            if (error) throw error;
            await fetchCategories();
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
            alert('Erro ao adicionar categoria. Verifique se já existe.');
        }
    };

    const deleteCategory = async (name: string) => {
        try {
            if (name === 'Todos') return; // Proteção extra
            const { error } = await supabase.from('categories').delete().eq('name', name);
            if (error) throw error;
            await fetchCategories();
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, addCategory, deleteCategory, refreshCategories: fetchCategories };
};
