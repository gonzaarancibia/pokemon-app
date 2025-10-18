import React, { useState, useEffect } from 'react';
import {
  fetchPokemonsWithDetails,
  fetchPokemonList,
} from '../../services/pokemonApi';

export default function usePokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const pokemonsPerPage = 20;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        if (searchTerm) {
          // If searching, fetch all and filter
          const basicList = await fetchPokemonList(1300);
          const pokemonsMatched = basicList.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setTotalPokemons(pokemonsMatched.length);

          // Paginate the filtered results
          const startIndex = (currentPage - 1) * pokemonsPerPage;
          const endIndex = startIndex + pokemonsPerPage;
          const paginatedPokemons = pokemonsMatched.slice(startIndex, endIndex);

          const detailedPokemons = await fetchPokemonsWithDetails(
            paginatedPokemons
          );
          setPokemons(detailedPokemons);
        } else {
          // Normal pagination
          const offset = (currentPage - 1) * pokemonsPerPage;
          const basicList = await fetchPokemonList(pokemonsPerPage, offset);
          const detailedPokemons = await fetchPokemonsWithDetails(
            basicList.results
          );
          setPokemons(detailedPokemons);
          setTotalPokemons(basicList.count);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [currentPage, searchTerm]);

  const searchPokemon = async (pokemonToFind) => {
    setSearchTerm(pokemonToFind || '');
    setCurrentPage(1); // Reset to first page when searching
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    pokemons,
    searchPokemon,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  };
}
