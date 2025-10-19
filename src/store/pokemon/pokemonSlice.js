import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    types: [],
    search: '',
  },
  sorting: {
    order: 'asc',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
  },
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setTypeFilter: (state, action) => {
      const type = action.payload;
      if (state.filters.types.includes(type)) {
        // Remove type if already selected
        state.filters.types = state.filters.types.filter((t) => t !== type);
      } else {
        // Add type if not selected
        state.filters.types.push(type);
      }
      // Reset to first page when filters change
      state.pagination.currentPage = 1;
    },
    clearTypeFilters: (state) => {
      state.filters.types = [];
      state.pagination.currentPage = 1;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1;
    },
    setSorting: (state, action) => {
      const { order } = action.payload;
      state.sorting.order = order;
      state.pagination.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.filters.types = [];
      state.filters.search = '';
      state.sorting.order = 'asc';
      state.pagination.currentPage = 1;
    },
  },
});

export const {
  setTypeFilter,
  clearTypeFilters,
  setSearchFilter,
  setSorting,
  setCurrentPage,
  resetFilters,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;

// Selectors
export const selectFilters = (state) => state.pokemon.filters;
export const selectSorting = (state) => state.pokemon.sorting;
export const selectPagination = (state) => state.pokemon.pagination;
