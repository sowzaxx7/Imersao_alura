const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch('../apis/artist.json')
    .then((response) => response.json())
    .then((data) => {
      const artists = data.artists;
      const filteredResults = artists.filter(artist => artist.name.toLowerCase().includes(searchTerm));
      displayResults(filteredResults);
    });
}

function displayResults(results) {
  hidePlaylists();

  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  if (results.length > 0) {
    const firstResult = results[0];
    artistImage.src = firstResult.urlImg;
    artistName.innerText = firstResult.name;
    resultArtist.classList.remove("hidden");
  } else {
    resultArtist.classList.add("hidden");
  }
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});