import { useState, useReducer } from 'react';
import PokemonCard from './PokemonCard';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_POKEMON': {
      const newPokemon = action.payload;
      return [...state, newPokemon];
    }
    case 'REMOVE_POKEMON':
      return state.filter((name) => name !== action.payload);
    case 'CLEAR_TEAM':
      return [];
    default:
      return state;
  }
}

export default function PokemonList({ pokemons }) {
  const [isClicked, setIsClicked] = useState(false);
  const [pokemonsSelected, dispatch] = useReducer(reducer, initialState);

  const handleClickPokemon = (pokemonName) => {
    dispatch({ type: 'ADD_POKEMON', payload: pokemonName });
  };

  const handleDelete = (pokemonName) => {
    dispatch({ type: 'REMOVE_POKEMON', payload: pokemonName });
  };
  return (
    <>
      <div className="pokemon-list" style={{ display: 'flex', gap: '20px' }}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            type={pokemon.type}
            img={pokemon.img}
            onClickPokemon={handleClickPokemon}
          />
        ))}
        <button onClick={() => setIsClicked(!isClicked)}>
          Click Pokemon List
        </button>
        {isClicked && <p>Pokemon List clicked!</p>}
      </div>

      <div>
        <h2>Team Pokemon Selected</h2>
        <ul>
          {pokemonsSelected.map((pokemonName) => (
            <li key={pokemonName} onClick={() => handleDelete(pokemonName)}>
              {pokemonName}
            </li>
          ))}
        </ul>
        <button onClick={() => dispatch({ type: 'CLEAR_TEAM' })}>
          Clear Team
        </button>
      </div>
    </>
  );
}
