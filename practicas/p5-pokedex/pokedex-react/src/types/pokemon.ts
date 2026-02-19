export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
}
