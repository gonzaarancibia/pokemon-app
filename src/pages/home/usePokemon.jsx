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

  const searchPokemon = async (pokemonToFind) => {
    if (!pokemonToFind) {
      // If the search term is empty, fetch the initial list again
      const basicList = await fetchPokemonList(5);
      const detailedPokemons = await fetchPokemonsWithDetails(basicList);
      setPokemons(detailedPokemons);
      return;
    }
    setLoading(true);
    try {
      const basicList = await fetchPokemonList(1300);
      const pokemonsMatched = basicList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(pokemonToFind.toLowerCase())
      );
      const detailedPokemons = await fetchPokemonsWithDetails(pokemonsMatched);
      setPokemons(detailedPokemons);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { pokemons, searchPokemon, loading, error };
}
