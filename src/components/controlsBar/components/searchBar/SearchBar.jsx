import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './SearchBar.scss';

export default function SearchBar({ onSearch }) {
  const [searchDisplayed, setSearchDisplayed] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchTerm: '',
    },
    mode: 'onChange',
  });

  const searchTerm = watch('searchTerm');

  const onSubmit = (data) => {
    if (data.searchTerm.trim()) {
      onSearch(data.searchTerm.trim());
      setSearchDisplayed(data.searchTerm.trim());
      reset();
    }
  };

  const handleClearSearch = () => {
    reset();
    setSearchDisplayed('');
    onSearch(''); // Limpiar la búsqueda
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search Pokémon..."
          {...register('searchTerm', {
            required: false,
            minLength: {
              value: 3,
              message: 'Debe tener al menos 3 carácter',
            },
            validate: (value) =>
              value.trim().length > 0 || 'No puede estar vacío',
          })}
        />
        <button
          type="submit"
          className="search-bar__button"
          disabled={!searchTerm || !searchTerm.trim()}
        >
          Buscar
        </button>
      </form>

      <div className="search-bar__info">
        {searchDisplayed.trim() && (
          <button
            type="button"
            className="search-bar__clear-button"
            onClick={handleClearSearch}
          >
            <span className="search-bar__clear-text">
              Search found: "{searchDisplayed}"
            </span>
            <span className="search-bar__clear-icon">×</span>
          </button>
        )}
        {errors.searchTerm && (
          <p className="search-bar__error">{errors.searchTerm.message}</p>
        )}
      </div>
    </div>
  );
}
