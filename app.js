const characters = document.getElementById("characters");
const serchBar = document.getElementById("searchBar");
let pokemon = [];

serchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filteredCharacters = pokemon.filter((character) => {
    return (
      character.name.includes(searchString) ||
      character.status.includes(searchString)
    );
  });
  displayPokemon(filteredCharacters);
});

console.log(characters);

const fetchCharacters = (data) => {
  const promises = [];

  for (let i = 1; i <= 300; i++) {
    const url = `https://rickandmortyapi.com/api/character/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    pokemon = results.map((data) => ({
      name: data.name,
      status: data.status,
      image: data.image,
      gender: data.gender,
      species: data.species,
      origin: data.origin.name,
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
      <li class="card">
          <img class="card-image" src="${pokeman.image}"/>
          <h2 class="card-title">${pokeman.name}. ${pokeman.status}</h2>
          <p class="card-subtitle">Type: ${pokeman.species}</p>
          <p class="card-subtitle">Gender: ${pokeman.gender}</p>
          <p class="card-subtitle">Location: ${pokeman.origin}</p>
      </li>
  `
    )
    .join("");
  characters.innerHTML = pokemonHTMLString;
};
fetchCharacters();
