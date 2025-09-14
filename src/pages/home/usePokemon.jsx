import React, { useState, useEffect } from 'react';
import {
  fetchPokemonsWithDetails,
  fetchPokemonList,
} from '../../services/pokemonApi';

export default function usePokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const basicList = await fetchPokemonList(5);
        const detailedPokemons = await fetchPokemonsWithDetails(basicList);
        setPokemons(detailedPokemons);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);
  return { pokemons, loading, error };
}
