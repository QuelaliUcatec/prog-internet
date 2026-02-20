import React, { useEffect, useRef, useState } from 'react';
import './App.css';

export default function UniverseConst() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const controllerRef = useRef(null);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch con debounce y AbortController
  useEffect(() => {
    // limpiar petición previa si query es muy corto
    if (query.trim().length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      setLoading(false);
      if (controllerRef.current) {
        controllerRef.current.abort();
        controllerRef.current = null;
      }
      return;
    }

    setLoading(true);

    // debounce 300ms
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // abort anterior
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;

      const url = `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`;

      (async () => {
        try {
          const res = await fetch(url, { signal: controller.signal });
          // DuckDuckGo devuelve JSON en array si OK
          if (!res.ok) throw new Error('network error');
          const data = await res.json();
          setSuggestions(Array.isArray(data) ? data : []);
          setActiveIndex(-1);
        } catch (err) {
          if (err.name === 'AbortError') {
            // peticion abortada: no hacer nada
            return;
          }
          // fallo en fetch (CORS u otro). Se limpia sugerencias.
          setSuggestions([]);
          console.error('Error fetching suggestions:', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 300);

    // cleanup
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Seleccionar sugerencia
  const selectSuggestion = (value) => {
    setQuery(value);
    setSuggestions([]);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  // Manejo teclado dentro del input (mejor que listener global)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) =>
        Math.min(i + 1, suggestions.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        selectSuggestion(suggestions[activeIndex].phrase);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="uc-container">
      <h1 className="uc-title">UniverseConst</h1>

      <div className="uc-input-wrapper">
        <input
          ref={inputRef}
          type="search"
          placeholder="Buscar en el universo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="uc-input"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={suggestions.length > 0}
          aria-activedescendant={
            activeIndex >= 0 ? `uc-item-${activeIndex}` : undefined
          }
        />
        {loading && <span className="uc-loading" aria-hidden>⏳</span>}
      </div>

      {suggestions.length > 0 && (
        <ul className="uc-list" role="listbox" id="uc-listbox">
          {suggestions.map((item, idx) => (
            <li
              id={`uc-item-${idx}`}
              key={`${item.phrase}-${idx}`}
              className={`uc-item ${idx === activeIndex ? 'uc-item-active' : ''}`}
              role="option"
              aria-selected={idx === activeIndex}
              onMouseDown={(e) => {
                // onMouseDown para evitar pérdida de foco antes del click
                e.preventDefault();
                selectSuggestion(item.phrase);
              }}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              {item.phrase}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}