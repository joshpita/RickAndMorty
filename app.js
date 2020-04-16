const characters = document.getElementById("characters");
const serchBar = document.getElementById("searchBar");
let character = [];

serchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filteredCharacters = character.filter((character) => {
    return character.name.toLowerCase().includes(searchString);
  });
  displayCharacters(filteredCharacters);
});

const fetchCharacters = (data) => {
  const promises = [];

  for (let i = 1; i <= 300; i++) {
    const url = `https://rickandmortyapi.com/api/character/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    character = results.map((data) => ({
      name: data.name,
      status: data.status,
      image: data.image,
      gender: data.gender,
      species: data.species,
      origin: data.origin.name,
    }));
    displayCharacters(character);
  });
};

const displayCharacters = (character) => {
  const characterHTMLString = character
    .map(
      (data) => `
      <li class="card">
          <img class="card-image" src="${data.image}"/>
          <h2 class="card-title">${data.name}. ${data.status}</h2>
          <p class="card-subtitle">Type: ${data.species}</p>
          <p class="card-subtitle">Gender: ${data.gender}</p>
          <p class="card-subtitle">Location: ${data.origin}</p>
      </li>
  `
    )
    .join("");
  characters.innerHTML = characterHTMLString;
};
fetchCharacters();
