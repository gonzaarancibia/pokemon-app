import React, { useEffect, useState, useRef } from 'react';
import PokemonList from '../../components/PokemonList';
import usePokemon from './usePokemon';

export default function Home() {
  const { pokemons, loading, error } = usePokemon();

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading pokemons</p>}
      {!loading && !error && <PokemonList pokemons={pokemons} />}
    </>
  );
}
