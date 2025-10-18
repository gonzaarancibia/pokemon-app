import PokemonList from '../../components/PokemonList';
import usePokemon from './usePokemon';
import SearchBar from '../../components/searchBar/SearchBar';
import Pagination from '../../components/Pagination';

export default function Home() {
  const {
    pokemons,
    searchPokemon,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  } = usePokemon();

  return (
    <div>
      {error && <p>Error loading pokemons</p>}
      <SearchBar onSearch={searchPokemon} />
      <PokemonList pokemons={pokemons} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </div>
  );
}
