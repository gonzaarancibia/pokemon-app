import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPokemonsWithDetails,
  fetchPokemonList,
} from '../../../services/pokemonApi';
import {
  setSearchFilter,
  setCurrentPage,
  selectFilters,
  selectSorting,
  selectPagination,
} from '../../../store/pokemon/pokemonSlice';

// Helper function to apply sorting
const applySorting = (pokemons, sorting) => {
  return [...pokemons].sort((a, b) => {
    let valueA, valueB;

    switch (sorting.field) {
      case 'name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case 'id':
      default:
        valueA = a.id || parseInt(a.url.split('/').slice(-2, -1)[0]);
        valueB = b.id || parseInt(b.url.split('/').slice(-2, -1)[0]);
        break;
    }

    if (sorting.order === 'desc') {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    } else {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }
  });
};

export default function usePokemon() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState(0);

  const pokemonsPerPage = pagination.itemsPerPage;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        // Check if we need to filter across all Pokemon
        const hasFilters = filters.search || filters.types.length > 0;

        if (hasFilters) {
          // Fetch ALL Pokemon when we have filters
          const basicList = await fetchPokemonList(1300);
          let pokemonsMatched = basicList.results;

          // Apply search filter
          if (filters.search) {
            pokemonsMatched = pokemonsMatched.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(filters.search.toLowerCase())
            );
          }

          // Get detailed Pokemon info for all matches
          const detailedPokemons = await fetchPokemonsWithDetails(
            pokemonsMatched
          );

          // Apply type filters on detailed Pokemon
          let filteredPokemons = detailedPokemons;
          if (filters.types.length > 0) {
            filteredPokemons = detailedPokemons.filter((pokemon) =>
              pokemon.types.some((type) =>
                filters.types.includes(type.type.name)
              )
            );
          }

          // Apply sorting
          const sortedPokemons = applySorting(filteredPokemons, sorting);

          setTotalPokemons(sortedPokemons.length);

          // Apply pagination to the filtered and sorted results
          const startIndex = (pagination.currentPage - 1) * pokemonsPerPage;
          const endIndex = startIndex + pokemonsPerPage;
          const paginatedPokemons = sortedPokemons.slice(startIndex, endIndex);

          setPokemons(paginatedPokemons);
        } else {
          // No filters - use normal pagination for better performance
          const offset = (pagination.currentPage - 1) * pokemonsPerPage;
          const basicList = await fetchPokemonList(pokemonsPerPage, offset);
          const detailedPokemons = await fetchPokemonsWithDetails(
            basicList.results
          );

          // Apply sorting
          const sortedPokemons = applySorting(detailedPokemons, sorting);

          setPokemons(sortedPokemons);
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
  }, [pagination.currentPage, filters, sorting, pokemonsPerPage]);

  const searchPokemon = async (pokemonToFind) => {
    dispatch(setSearchFilter(pokemonToFind || ''));
  };

  const goToPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
  const hasNextPage = pagination.currentPage < totalPages;
  const hasPreviousPage = pagination.currentPage > 1;

  return {
    pokemons,
    searchPokemon,
    loading,
    error,
    currentPage: pagination.currentPage,
    totalPages,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  };
}
