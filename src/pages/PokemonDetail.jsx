import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router';
import {
  addFavorite,
  removeFavorite,
} from '../store/favorites/favoritesSlice.js';

export default function PokemonDetail() {
  const { pokemon } = useLoaderData();
  const favorites = useSelector((state) => state.favorites.list);
  const dispatch = useDispatch();
  const isFavorite = favorites.includes(pokemon.name);
  if (!pokemon) return null;

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '2rem auto',
        padding: '2rem',
        background: '#f8f8f8',
        borderRadius: 24,
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <h1
          style={{ textTransform: 'capitalize', fontSize: '2.5rem', margin: 0 }}
        >
          {pokemon.name}
        </h1>
        <span
          style={{
            fontSize: '2.5rem',
            cursor: 'pointer',
            color: isFavorite ? '#e11d48' : '#a1a1aa',
            transition: 'color 0.2s',
            userSelect: 'none',
          }}
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          onClick={() => {
            isFavorite
              ? dispatch(removeFavorite(pokemon.name))
              : dispatch(addFavorite(pokemon.name));
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          style={{
            width: 320,
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            marginBottom: 24,
          }}
        />
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ marginBottom: 8 }}>Tipos</h2>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                style={{
                  background: '#e0e7ff',
                  color: '#3730a3',
                  borderRadius: '12px',
                  padding: '4px 16px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  textTransform: 'capitalize',
                  border: '1px solid #a5b4fc',
                }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ marginBottom: 8 }}>Habilidades</h2>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {pokemon.abilities.map((a) => (
              <span
                key={a.ability.name}
                style={{
                  background: '#fef9c3',
                  color: '#b45309',
                  borderRadius: '12px',
                  padding: '4px 16px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  textTransform: 'capitalize',
                  border: '1px solid #fde68a',
                }}
              >
                {a.ability.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 style={{ marginBottom: 8 }}>Stats</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {pokemon.stats.map((s) => (
              <li
                key={s.stat.name}
                style={{
                  textTransform: 'capitalize',
                  fontSize: '1.05rem',
                  marginBottom: 6,
                  background: '#f3f4f6',
                  borderRadius: 8,
                  padding: '4px 12px',
                  display: 'inline-block',
                  minWidth: 120,
                }}
              >
                {s.stat.name}:{' '}
                <span style={{ fontWeight: 'bold' }}>{s.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
