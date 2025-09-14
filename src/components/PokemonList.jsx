import PokemonCard from './pokemonCard/PokemonCard';

export default function PokemonList({ pokemons }) {
  return (
    <>
      <div className="pokemon-list" style={{ display: 'flex', gap: '20px' }}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            types={pokemon.types}
            img={pokemon.image}
          />
        ))}
      </div>
    </>
  );
}
