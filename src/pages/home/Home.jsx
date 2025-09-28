import PokemonList from '../../components/PokemonList';
import usePokemon from './usePokemon';
import SearchBar from '../../components/searchBar/SearchBar';

export default function Home() {
  const { pokemons, searchPokemon, loading, error } = usePokemon();

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading pokemons</p>}
      <SearchBar onSearch={searchPokemon} />
      {!loading && !error && <PokemonList pokemons={pokemons} />}
    </>
  );
}
