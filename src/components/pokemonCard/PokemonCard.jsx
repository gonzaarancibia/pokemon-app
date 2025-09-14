import './PokemonCard.css';

import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
} from '../../store/favorites/favoritesSlice.js';

export default function PokemonCard({ name, types, img }) {
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.list);
  const dispatch = useDispatch();

  const isFavorite = favorites.includes(name);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(name));
    } else {
      dispatch(addFavorite(name));
    }
  };

  return (
    <div
      className="pokemon-card"
      onClick={() => {
        navigate(`/pokemon/${name}`);
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>{name}</h2>
        <span
          className={`pokemon-card__favorite${
            isFavorite ? ' pokemon-card__favorite--active' : ''
          }`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </span>
      </div>
      <img src={img} alt={name} width="200" height="200" />
      <div className="pokemon-card__container-types">
        {types?.map(({ type }) => (
          <span key={type.name} className="pokemon-card__type">
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
