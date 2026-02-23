import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, X, AlertCircle, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutocomplete } from '../hooks/useAutocomplete';

const SearchPredictive = () => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const { suggestions, isLoading, error } = useAutocomplete(query);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset selection when suggestions change
    useEffect(() => {
        setSelectedIndex(-1);
        if (suggestions.length > 0 && query.length >= 5) {
            setIsOpen(true);
        } else if (suggestions.length === 0 && !isLoading) {
            // Keep open if no results to show "no results" state if query >= 5
            setIsOpen(query.length >= 5);
        }
    }, [suggestions, query, isLoading]);

    const handleKeyDown = (e) => {
        if (!isOpen) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0) {
                e.preventDefault();
                selectSuggestion(suggestions[selectedIndex]);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const selectSuggestion = (suggestion) => {
        setQuery(suggestion);
        setIsOpen(false);
        // Optional: Trigger search or navigate
        console.log('Selected:', suggestion);
    };

    const clearInput = () => {
        setQuery('');
        setIsOpen(false);
        inputRef.current?.focus();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-20 mx-auto">
            <div className="w-full text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4 sm:text-5xl">
                    DuckDuckGo <span className="text-blue-600"> Buscador de palabras</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-md mx-auto">
                    Escribe 5+ caracteres para activar.
                </p>
            </div>

            <div ref={containerRef} className="relative w-full group">
                {/* Glow effect on focus */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>

                <div className="relative flex items-center w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden active:shadow-md transition-all duration-300 ring-offset-2 focus-within:ring-2 focus-within:ring-blue-500/50">
                    <div className="flex items-center justify-center pl-5 text-slate-400">
                        <Search className="w-5 h-5" />
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full h-14 pl-4 pr-12 text-lg text-slate-900 bg-transparent outline-none placeholder:text-slate-400"
                        placeholder="Buscar en la web..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => query.length >= 5 && setIsOpen(true)}
                    />

                    <div className="absolute right-4 flex items-center space-x-2">
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                            </motion.div>
                        )}

                        {query.length > 0 && (
                            <button
                                onClick={clearInput}
                                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                                title="Limpiar"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute z-50 w-full mt-3 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
                        >
                            <div className="p-2">
                                {error ? (
                                    <div className="flex items-center p-4 text-red-500 space-x-2">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="text-sm font-medium">{error}</span>
                                    </div>
                                ) : suggestions.length > 0 ? (
                                    <ul className="max-h-80 overflow-y-auto custom-scrollbar">
                                        {suggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                className={`rounded-xl transition-all duration-200 cursor-pointer ${selectedIndex === index
                                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                                    : 'hover:bg-slate-100 text-slate-700'
                                                    }`}
                                                onClick={() => selectSuggestion(suggestion)}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                            >
                                                <div className="flex items-center justify-between px-4 py-3">
                                                    <div className="flex items-center space-x-3 truncate">
                                                        <Search className={`w-4 h-4 ${selectedIndex === index ? 'text-blue-100' : 'text-slate-400'}`} />
                                                        <span className="font-medium truncate">{suggestion}</span>
                                                    </div>
                                                    {selectedIndex === index && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -5 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md flex items-center"
                                                        >
                                                            <span>Enter</span>
                                                            <CornerDownLeft className="w-3 h-3 ml-1" />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : query.length >= 5 && !isLoading ? (
                                    <div className="p-8 text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 text-slate-400 mb-3">
                                            <Search className="w-6 h-6" />
                                        </div>
                                        <p className="text-slate-600 font-medium italic">
                                            No encontramos nada para "<span className="text-slate-900 font-semibold not-italic">{query}</span>"
                                        </p>
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-xs text-slate-400 uppercase tracking-widest font-semibold">
                                        {query.length < 5 ? `Escribe ${5 - query.length} caracteres más...` : 'Buscando...'}
                                    </div>
                                )}
                            </div>

                            {/* Dropdown Footer - Keyboard Hints */}
                            {suggestions.length > 0 && (
                                <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center">
                                            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm mr-1.5 font-sans">
                                                <ArrowUp className="w-2.5 h-2.5" />
                                            </kbd>
                                            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm mr-1.5 font-sans">
                                                <ArrowDown className="w-2.5 h-2.5" />
                                            </kbd>
                                            Navegar
                                        </span>
                                    </div>
                                    <span className="flex items-center">
                                        <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm mr-1.5 font-sans">Esc</kbd>
                                        Cerrar
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative background elements */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(59,130,246,0.05)_0%,rgba(255,255,255,0)_100%)] pointer-events-none" />
        </div>
    );
};

export default SearchPredictive;
