import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function PokemonCard({ name, type, img }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Primer renderizado de ${name}`);
    return () => {
      console.log(`Desmontando ${name}`);
    };
  }, []);
  return (
    <div
      className="pokemon-card"
      onClick={() => {
        navigate(`/pokemon/${name}`);
      }}
      style={{
        border: '2px solid gray',
        padding: '10px',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <h2>{name}</h2>
      <img src={img} alt={name} />
      <p>Type: {type}</p>
    </div>
  );
}
