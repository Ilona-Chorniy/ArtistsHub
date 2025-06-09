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
    albumsContainer,
  } = domRefs;

  // --- Loading genres ---
  async function fetchGenres() {
    try {
      const { data } = await axios.get(
        'https://sound-wave.b.goit.study/api/genres'
      );
      console.log(data);
      data.forEach(item => {
        let genreName = '';
        if (typeof item === 'string') genreName = item;
        else if (item && typeof item.genre === 'string') genreName = item.genre;
        if (genreName) genresMap.set(genreName.toLowerCase(), genreName);
      });
      console.log('Genres loaded:', genresMap);
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
      console.log(data);
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
      console.log(data.tracksList);

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

      // --- Render albums and tracks ---
      const tracksList = data.tracksList || [];
      const filteredTracks = tracksList.filter(
        track => track.strArtist === data.strArtist
      );

      const tracksMap = new Map();
      filteredTracks.forEach(track => {
        const albumName = track.strAlbum || 'Unknown Album';
        if (!tracksMap.has(albumName)) {
          tracksMap.set(albumName, []);
        }
        tracksMap.get(albumName).push(track);
      });

      // Рендеримо альбоми
      renderAlbumTracks(tracksMap);

      // --- Genres ---
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

  function formatDuration(ms) {
    if (!ms || isNaN(ms)) return '';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function renderAlbumTracks(tracksMap) {
    albumsContainer.innerHTML = '';

    const ul = document.createElement('ul');
    ul.classList.add('albums__card-list');

    for (const [albumName, tracks] of tracksMap.entries()) {
      const albumItem = document.createElement('li');
      albumItem.className = 'albums__name-item albums-name';

      const title = document.createElement('h4');
      title.className = 'albums__name-title';
      title.textContent = albumName;
      albumItem.appendChild(title);

      const wrapper = document.createElement('div');
      wrapper.className = 'albums__track-option';

      // Заголовки колонок
      const headerList = document.createElement('ul');
      headerList.className = 'albums__track-list-option';

      headerList.innerHTML = `
      <li class="albums__track-item">track</li>
      <li class="albums__time-item">time</li>
      <li class="albums__link-item">link</li>
    `;

      wrapper.appendChild(headerList);

      // Треки
      tracks.forEach(track => {
        const trackList = document.createElement('ul');
        trackList.className = 'albums__track-list';

        const name = document.createElement('li');
        name.className = 'albums__track-name';
        name.textContent = track.strTrack || '';

        const time = document.createElement('li');
        time.className = 'albums__trak-time';
        time.textContent = formatDuration(track.intDuration);

        const link = document.createElement('li');
        link.className = 'albums__trak-link';
        if (track.movie) {
          const a = document.createElement('a');
          a.href = track.movie;
          a.textContent = 'Listen';
          a.target = '_blank';
          link.appendChild(a);
        }

        trackList.append(name, time, link);
        wrapper.appendChild(trackList);
      });

      albumItem.appendChild(wrapper);
      ul.appendChild(albumItem);
    }

    albumsContainer.appendChild(ul);
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
