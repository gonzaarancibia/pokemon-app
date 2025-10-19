import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites/favoritesSlice.js';
import pokemonReducer from './pokemon/pokemonSlice.js';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    pokemon: pokemonReducer,
  },
});
