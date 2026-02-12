import React, { useEffect, useState } from 'react';

// 1. Definimos las interfaces para el tipado estricto
interface Pokemon {
  name: string;
  url: string;
}

interface PokeAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export default function App() {
  // Estado para almacenar la lista completa
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        // Usamos limit=10000 para asegurar que traemos TODOS de una vez.
        // Esto evita tener que manejar paginación si solo quieres la lista completa.
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: PokeAPIResponse = await response.json();
        
        // Guardamos el array de resultados en el estado
        setPokemons(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemons();
  }, []); // El array vacío asegura que esto solo corra una vez al montar el componente

  // Renderizado condicional
  if (loading) return <div style={styles.center}>Cargando todos los Pokémon...</div>;
  if (error) return <div style={styles.center}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Lista Completa de Pokémon</h1>
        <p>Total encontrados: <strong>{pokemons.length}</strong></p>
      </header>

      <ul style={styles.list}>
        {pokemons.map((poke, index) => (
          <li key={index} style={styles.listItem}>
            <span style={styles.number}>#{index + 1}</span>
            <span style={styles.name}>{poke.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Estilos simples en objeto (para no depender de CSS externo en este ejemplo)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '10px',
  },
  listItem: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'capitalize',
  },
  number: {
    color: '#888',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
    color: '#2c3e50',
  }
};