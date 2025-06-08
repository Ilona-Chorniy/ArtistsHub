// src/js/modal.js
import domRefs from './artistModal/domRefs';
import { closeModal, initCloseModalListeners } from './artistModal/closeModal';
import axios from 'axios';

let genresMap = new Map();
let allArtists = []; // збережемо всі артисти для доступу до жанрів

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

  // --- Завантаження жанрів ---
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
      console.error('Помилка при завантаженні жанрів:', error);
    }
  }

  // --- Завантаження всіх артистів ---
  async function fetchAllArtists() {
    try {
      const { data } = await axios.get(
        'https://sound-wave.b.goit.study/api/artists'
      );
      allArtists = data.artists;
    } catch (error) {
      console.error('Помилка при завантаженні артистів:', error);
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
        throw new Error('Дані артиста не знайдено');
      }

      name.textContent = data.strArtist || 'Без імені';
      thumb.src =
        data.strArtistThumb ||
        'https://via.placeholder.com/280x280?text=No+Photo';
      thumb.alt = `Фото виконавця ${data.strArtist || ''}`;
      bio.textContent = data.strBiographyEN || 'Опис відсутній';

      yearsActive.textContent = data.intFormedYear
        ? `${data.intFormedYear} - ${data.intDiedYear || 'теперішній час'}`
        : 'Н/Д';
      gender.textContent = data.strGender || 'Н/Д';
      members.textContent = data.intMembers || 'Н/Д';
      country.textContent = data.strCountry || 'Н/Д';

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
        noGenresEl.textContent = 'Жанри відсутні';
        genresList.appendChild(noGenresEl);
      }
    } catch (error) {
      console.error(error);
      alert('Не вдалося завантажити дані артиста.');
      closeModal();
    }
  }

  openModalBtn.addEventListener('click', () => {
    const artistId = openModalBtn.dataset.artistId;
    if (artistId) {
      openModal(artistId);
    } else {
      console.error('Artist ID не знайдено на кнопці.');
      alert('Не вдалося визначити ID артиста.');
    }
  });

  initCloseModalListeners();
});
