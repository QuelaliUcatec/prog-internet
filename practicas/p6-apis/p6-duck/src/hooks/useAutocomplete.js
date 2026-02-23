import { useState, useEffect, useCallback } from 'react';

export const useAutocomplete = (query, delay = 300, minLength = 5) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSuggestions = useCallback(async (searchTerm) => {
        if (searchTerm.length < minLength) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Usamos el proxy configurado en vite.config.js para evitar problemas de CORS
            const response = await fetch(`/api/duck/?q=${encodeURIComponent(searchTerm)}&type=list`);

            if (!response.ok) {
                throw new Error('Error al conectar con la API de DuckDuckGo');
            }

            const data = await response.json();
            // data[1] contains the list of suggestions
            setSuggestions(data[1] || []);
        } catch (err) {
            console.error('Autocomplete Error:', err);
            setError('No se pudieron cargar las sugerencias');
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, [minLength]);

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchSuggestions(query);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [query, delay, fetchSuggestions]);

    return { suggestions, isLoading, error };
};
