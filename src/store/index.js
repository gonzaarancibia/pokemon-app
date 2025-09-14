import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites/favoritesSlice.js';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
