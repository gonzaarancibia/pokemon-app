import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTypeFilter,
  clearTypeFilters,
  selectFilters,
} from '../../store/pokemon/pokemonSlice';
import SearchBar from './components/searchBar/SearchBar';
import TypeMultiSelect from './components/typeMultiSelect/TypeMultiSelect';
import SortButton from './components/sortButton/SortButton';
import './ControlsBar.scss';

// Common Pokemon types for filtering
const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

export default function ControlsBar({ onSearch }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleTypeToggle = (type) => {
    dispatch(setTypeFilter(type));
  };

  return (
    <div className="controls-bar">
      <SearchBar onSearch={onSearch} />

      <div className="controls-bar__filters">
        <div className="controls-bar__type-filter">
          <TypeMultiSelect
            selectedTypes={filters.types}
            onTypeToggle={handleTypeToggle}
            onClearTypes={() => dispatch(clearTypeFilters())}
            pokemonTypes={POKEMON_TYPES}
          />
        </div>

        <div className="controls-bar__sort">
          <SortButton />
        </div>
      </div>
    </div>
  );
}
