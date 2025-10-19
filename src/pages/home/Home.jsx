import PokemonList from '../../components/pokemonList/PokemonList';
import usePokemon from './hooks/usePokemon';
import ControlsBar from '../../components/controlsBar/ControlsBar';
import Pagination from '../../components/pagination/Pagination';

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
      <ControlsBar onSearch={searchPokemon} />
      <PokemonList pokemons={pokemons} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        loading={loading}
      />
    </div>
  );
}
