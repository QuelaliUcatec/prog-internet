import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error(`Error al obtener la lista: ${response.status}`);
  }
  return response.json();
}

export async function fetchPokemonDetail(
  nameOrId: string | number
): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error(`Pokémon no encontrado: ${nameOrId}`);
  }
  return response.json();
}

export async function fetchMultiplePokemon(
  pokemonList: { name: string; url: string }[]
): Promise<Pokemon[]> {
  const promises = pokemonList.map((item) => {
    const id = item.url.split('/').filter(Boolean).pop();
    return fetchPokemonDetail(id!);
  });
  return Promise.all(promises);
}