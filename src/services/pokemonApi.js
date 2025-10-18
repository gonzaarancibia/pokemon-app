// Get a list of basic pokémons from the API (no image)
export async function fetchPokemonList(limit = 20, offset = 0) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

// Get a list of detail pokémons from the API (includes image)
export async function fetchPokemonsWithDetails(pokemonList) {
  return await Promise.all(
    pokemonList.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const details = await response.json();
      return {
        ...pokemon,
        image: details.sprites.other['official-artwork'].front_default,
        types: details.types,
      };
    })
  );
}

// Functions to interact with the Pokemon API
export async function fetchPokemonDetail(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const pokemon = await response.json();
  return pokemon;
}
