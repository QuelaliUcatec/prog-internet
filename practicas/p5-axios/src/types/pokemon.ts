// ESTE ARCHIVO ES CRÍTICO. Si falla, fallan los otros 3.
export interface PokemonBase {
  name: string;
  url: string;
  id: string;
  imageUrl: string;
}