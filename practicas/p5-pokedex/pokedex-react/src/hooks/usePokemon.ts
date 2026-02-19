import { useEffect, useState } from "react";
import { getPokemons, getPokemonByName } from "../api/pokeApi";
import type { Pokemon } from "../types/pokemon";

export const usePokemon = (page: number) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const limit = 20;
  const offset = page * limit;

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);

      const data = await getPokemons(limit, offset);

      const details: Pokemon[] = await Promise.all(
        data.results.map((pokemon: { name: string }) =>
          getPokemonByName(pokemon.name)
        )
      );

      setPokemons(details);
      setLoading(false);
    };

    loadPokemons();
  }, [offset]);

  return { pokemons, loading };
};
