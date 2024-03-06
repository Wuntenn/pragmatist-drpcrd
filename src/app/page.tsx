import PokemonRow, { FilterablePokedexTable, PokedexTable, PokemonInterface } from "../components/PokemonComponents";
import { allPokemonData } from "@/lib/PokemonData";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-20">
      <FilterablePokedexTable pokemonArray={allPokemonData} />
    </main>
  );
}
