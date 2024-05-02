/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <KENNY_KWOK>
 *      Student ID: <130049232>
 *      Date:       <05/03/2024>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

document.addEventListener("DOMContentLoaded", () => {
  function createButtons() {
    const nav = document.getElementById("menu");
    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.addEventListener("click", function () {
        displaySongs(artist);
      });
      nav.appendChild(button);
    });
  }

  createButtons();
  displaySongs(artists[0]);

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

    // song title
    const songTitle = document.createElement("h3");
    songTitle.textContent = song.title;
    songTitle.classList.add("songName");
    card.appendChild(songTitle);

    // year recorded
    const songYear = document.createElement("time");
    songYear.textContent = song.year;
    songYear.classList.add("yearRecorded");
    card.appendChild(songYear);

    // duration
    const songDuration = document.createElement("span");
    const minutes = Math.floor(song.duration / 60);
    const seconds = song.duration % 60;
    songDuration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    songDuration.classList.add("duration");
    card.appendChild(songDuration);

    // open url when clicked
    card.addEventListener("click", () => {
      window.open(song.url, "_blank");
    });

    // Return the card’s <div> element to the caller
    return card;
  }

  function displaySongs(artist) {
    const links = artist.urls
      .map(function (link) {
        return `<a href="${link.url}" target="_blank">${link.name}</a>`;
      })
      .join(", ");

    const selectedArtist = document.getElementById("selected-artist");
    selectedArtist.innerHTML = `${artist.name} (${links})`;

    const container = document.querySelector("#container");
    container.innerHTML = "";

    const artistSongs = songs.filter(function (song) {
      return song.artistId === artist.artistId && !song.explicit;
    });

    artistSongs.forEach(function (song) {
      const songCard = createSongCard(song);
      container.appendChild(songCard);
    });
  }
});
// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "Appdata");
