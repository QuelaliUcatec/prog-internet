export interface PokemonBase {
  id: string;
  name: string;
  url?: string;
  imageUrl: string;
  types: string[]; 
}