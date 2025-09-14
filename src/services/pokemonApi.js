// Functions to interact with the Pokemon API
export async function fetchPokemonDetail(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const pokemon = await response.json();
  return pokemon;
}
