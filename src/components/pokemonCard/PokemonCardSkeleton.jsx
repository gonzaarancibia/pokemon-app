import './PokemonCardSkeleton.scss';

export default function PokemonCardSkeleton() {
  return (
    <div className="pokemon-card-skeleton">
      <div className="pokemon-card-skeleton__title"></div>
      <div className="pokemon-card-skeleton__image"></div>
      <div className="pokemon-card-skeleton__types">
        <div className="pokemon-card-skeleton__type"></div>
        <div className="pokemon-card-skeleton__type"></div>
      </div>
    </div>
  );
}
