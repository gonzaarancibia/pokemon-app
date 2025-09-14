import { useState } from 'react';
import PokemonCard from './PokemonCard';

export default function PokemonList({ pokemons }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div className="pokemon-list" style={{ display: 'flex', gap: '20px' }}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            type={pokemon.type}
            img={pokemon.img}
          />
        ))}
        <button onClick={() => setIsClicked(!isClicked)}>
          Click Pokemon List
        </button>
        {isClicked && <p>Pokemon List clicked!</p>}
      </div>
    </>
  );
}
