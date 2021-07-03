function getArtists() {
  fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
  }).then((response) => {
    response.json().then((data) => {
      const artists = data.items;

      // Loop för att hämta artister
      for (artist of artists) {
        const artistsList = document.querySelector('.list');
        const createListItem = document.createElement('li');
        createListItem.classList.add('lists');
        createListItem.innerText = artist.name;
        artistsList.appendChild(createListItem);
      }
    });
  });
}
