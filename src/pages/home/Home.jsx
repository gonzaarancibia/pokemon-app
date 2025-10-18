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
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading pokemons</p>}
      <SearchBar onSearch={searchPokemon} />
      {!loading && !error && (
        <>
          <PokemonList pokemons={pokemons} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </>
      )}
    </>
  );
}
