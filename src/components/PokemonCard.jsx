import { useEffect, useState } from 'react';

export default function PokemonCard({ name, type, img, onClickPokemon }) {
  const [isClicked, setIsClicked] = useState(false);

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
        setIsClicked(!isClicked);
        onClickPokemon(name);
      }}
      style={{
        border: isClicked ? '2px solid blue' : '2px solid gray',
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
