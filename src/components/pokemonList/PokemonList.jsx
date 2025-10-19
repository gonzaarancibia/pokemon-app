import PokemonCard from '../pokemonCard/PokemonCard';
import PokemonCardSkeleton from '../pokemonCard/PokemonCardSkeleton';
import './PokemonList.scss';

export default function PokemonList({ pokemons, loading = false }) {
  // Show 8 skeletons when loading (2 rows x 4 columns)
  if (loading) {
    return (
      <div className="pokemon-list">
        {Array.from({ length: 8 }, (_, index) => (
          <PokemonCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          types={pokemon.types}
          img={pokemon.image}
        />
      ))}
    </div>
  );
}
