import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSorting,
  selectSorting,
} from '../../../../store/pokemon/pokemonSlice';
import './SortButton.scss';

export default function SortButton() {
  const dispatch = useDispatch();
  const sorting = useSelector(selectSorting);

  const handleSort = () => {
    // Toggle between A-Z and Z-A alphabetical sorting
    const newOrder =
      sorting.field === 'name' && sorting.order === 'asc' ? 'desc' : 'asc';
    dispatch(setSorting({ field: 'name', order: newOrder }));
  };

  const getSortLabel = () => {
    if (sorting.field === 'name') {
      return sorting.order === 'asc' ? 'A-Z' : 'Z-A';
    }
    return 'A-Z'; // Default
  };

  const getSortIcon = () => {
    if (sorting.field === 'name') {
      return sorting.order === 'asc' ? '↑' : '↓';
    }
    return '↑'; // Default
  };

  return (
    <button
      className="sort-button"
      onClick={handleSort}
      title="Sort alphabetically"
    >
      <span className="sort-button__label">{getSortLabel()}</span>
      <span className="sort-button__icon">{getSortIcon()}</span>
    </button>
  );
}
