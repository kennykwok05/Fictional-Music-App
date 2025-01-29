// Destructure 'artists' and 'songs' from the global window object
const { artists, songs } = window;

// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", () => {
  // Function to dynamically create buttons for each artist
  function createButtons() {
    const nav = document.getElementById("menu");
    // Loop through each artist in the artists array
    artists.forEach((artist) => {
      // Create a new button for each artist
      const button = document.createElement("button");
      button.textContent = artist.name;
      // Add a click event listener that will display the songs of the clicked artist
      button.addEventListener("click", function () {
        displaySongs(artist);
      });
      // Append the created button to the navigation menu
      nav.appendChild(button);
    });
  }
  // Call createButtons function to add artist buttons to the page
  createButtons();
  // Initially display songs of the first artist in the array
  displaySongs(artists[0]);

  // Function to create a card for each song 
  function createSongCard(song) {
    // Create a <div> to hold the card
    const card = document.createElement("div");
    // Add the .card class to the <div>
    card.classList.add("card");

    // Create a song image, use the .card-image class
    const songImg = document.createElement("img");
    songImg.src = song.imageUrl;
    songImg.classList.add("card-image");
    card.appendChild(songImg);

    // Create the song title
    const songTitle = document.createElement("h3");
    songTitle.textContent = song.title;
    songTitle.classList.add("songName");
    card.appendChild(songTitle);

    // Append the year recorded
    const songYear = document.createElement("time");
    songYear.textContent = song.year;
    songYear.classList.add("yearRecorded");
    card.appendChild(songYear);

    // Create a <span> element for the song duration and format it in minutes:seconds
    const songDuration = document.createElement("span");
    const minutes = Math.floor(song.duration / 60);
    const seconds = song.duration % 60;
    songDuration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    songDuration.classList.add("duration");
    card.appendChild(songDuration);

    // Open url when clicked
    card.addEventListener("click", () => {
      window.open(song.url, "_blank");
    });

  // Return the created card element to be added to the page
    return card;
  }
  
  // Function to display the songs of a selected artist
  function displaySongs(artist) {
    // Map through the artist's URLs and create clickable links
    const links = artist.urls
      .map(function (link) {
        return `<a href="${link.url}" target="_blank">${link.name}</a>`;
      })
      .join(", "); // Join the links into a comma-separated list

    // Display the selected artist's name and their links in the DOM
    const selectedArtist = document.getElementById("selected-artist");
    selectedArtist.innerHTML = `${artist.name} (${links})`;
    // Get the container where the songs will be displayed
    const container = document.querySelector("#container");
    container.innerHTML = ""; // Clear the container before adding new songs
    // Filter the songs to only include those that belong to the selected artist and are not explicit
    const artistSongs = songs.filter(function (song) {
      return song.artistId === artist.artistId && !song.explicit;
    });
    // Loop through each song and create a song card for it
    artistSongs.forEach(function (song) {
      const songCard = createSongCard(song);
      container.appendChild(songCard);
    });
  }
});

