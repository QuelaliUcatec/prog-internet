const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (limit: number, offset: number) => {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  return response.json();
};

export const getPokemonByName = async (name: string) => {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  return response.json();
};
