// ============================================================
// TIPOS DE TYPESCRIPT PARA LA POKEAPI
// ============================================================

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
    dream_world: {
      front_default: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
}

export const TYPE_COLORS: Record<string, string> = {
  fire: '#FF4D4D',
  water: '#4D9FFF',
  grass: '#4CAF50',
  electric: '#FFD700',
  psychic: '#FF69B4',
  ice: '#87CEEB',
  dragon: '#7B68EE',
  dark: '#696969',
  fairy: '#FFB6C1',
  fighting: '#CD5C5C',
  flying: '#87CEFA',
  poison: '#9370DB',
  ground: '#DEB887',
  rock: '#A9A9A9',
  bug: '#90EE90',
  ghost: '#9966CC',
  steel: '#A8A8D8',
  normal: '#A8A878',
};