import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';

export default function PokemonDetail() {
  const { pokemon } = useLoaderData();
  if (!pokemon) return null;

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: '2rem auto',
        padding: '2rem',
        background: '#f8f8f8',
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        style={{ width: 400 }}
      />
      <h2>Tipos</h2>
      <ul>
        {pokemon.types.map((t) => (
          <li key={t.type.name} style={{ textTransform: 'capitalize' }}>
            {t.type.name}
          </li>
        ))}
      </ul>
      <h2>Habilidades</h2>
      <ul>
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name} style={{ textTransform: 'capitalize' }}>
            {a.ability.name}
          </li>
        ))}
      </ul>
      <h2>Stats</h2>
      <ul>
        {pokemon.stats.map((s) => (
          <li key={s.stat.name} style={{ textTransform: 'capitalize' }}>
            {s.stat.name}: {s.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}
