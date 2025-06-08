// src/js/modal.js
import domRefs from './artistModal/domRefs';
import { closeModal, initCloseModalListeners } from './artistModal/closeModal';
import axios from 'axios';

let genresMap = new Map();
let allArtists = []; // We will save all artists for access to genres

document.addEventListener('DOMContentLoaded', async () => {
  const {
    modal,
    openModalBtn,
    name,
    thumb,
    yearsActive,
    gender,
    members,
    country,
    bio,
    genresList,
  } = domRefs;

  // --- Loading genres ---
  async function fetchGenres() {
    try {
      const { data } = await axios.get(
        'https://sound-wave.b.goit.study/api/genres'
      );
      data.forEach(item => {
        let genreName = '';
        if (typeof item === 'string') genreName = item;
        else if (item && typeof item.genre === 'string') genreName = item.genre;
        if (genreName) genresMap.set(genreName.toLowerCase(), genreName);
      });
    } catch (error) {
      console.error('Error loading genres:', error);
    }
  }

  // --- Loading all artists ---
  async function fetchAllArtists() {
    try {
      const { data } = await axios.get(
        'https://sound-wave.b.goit.study/api/artists'
      );
      allArtists = data.artists;
    } catch (error) {
      console.error('Error loading artists:', error);
    }
  }

  await Promise.all([fetchGenres(), fetchAllArtists()]);

  async function openModal(artistId) {
    try {
      modal.classList.remove('modal--hidden');

      const { data } = await axios.get(
        `https://sound-wave.b.goit.study/api/artists/${artistId}`
      );

      if (!data || !data.strArtist) {
        throw new Error('Artist data not found');
      }

      name.textContent = data.strArtist || 'No name';
      thumb.src =
        data.strArtistThumb ||
        'https://via.placeholder.com/280x280?text=No+Photo';
      thumb.alt = `Artisns photo ${data.strArtist || ''}`;
      bio.textContent = data.strBiographyEN || 'Description not available';

      yearsActive.textContent = data.intFormedYear
        ? `${data.intFormedYear} - ${data.intDiedYear || ' present'}`
        : 'No data available';
      gender.textContent = data.strGender || 'No data available';
      members.textContent = data.intMembers || 'No data available';
      country.textContent = data.strCountry || 'No data available';

      // --- ЖАНРИ ---
      genresList.innerHTML = '';
      const fullArtistData = allArtists.find(artist => artist._id === artistId);
      const genres = fullArtistData?.genres || [];

      if (genres.length > 0) {
        genres.forEach(genreKey => {
          const displayGenre =
            genresMap.get(genreKey.toLowerCase()) || genreKey;
          const genreEl = document.createElement('span');
          genreEl.classList.add('artist-card__genres-item');
          genreEl.textContent = displayGenre;
          genresList.appendChild(genreEl);
        });
      } else {
        const noGenresEl = document.createElement('span');
        noGenresEl.classList.add('artist-card__genres-item');
        noGenresEl.textContent = 'Genres not available';
        genresList.appendChild(noGenresEl);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to load artist data');
      closeModal();
    }
  }

  openModalBtn.addEventListener('click', () => {
    const artistId = openModalBtn.dataset.artistId;
    if (artistId) {
      openModal(artistId);
    } else {
      console.error('Artist ID not found on the button');
      alert('Failed to determine the artist ID');
    }
  });

  initCloseModalListeners();
});
