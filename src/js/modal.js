import { domRefs } from './artistModal/domRefs.js';
import {
  closeModal,
  initCloseModalListeners,
} from './artistModal/closeModal.js';
import { fetchArtistData } from './artistModal/fetchArtistData.js';
import { renderArtistInfo } from './artistModal/renderArtistInfo.js';
import { renderAlbums } from './artistModal/renderAlbums.js';
import { renderGenres } from './artistModal/renderGenres.js';

export async function openModal(artistId) {
  try {
    // Показати модалку
    domRefs.modal.classList.remove('modal--hidden');
    document.body.classList.add('no-scroll');

    // Отримати дані артиста
    const artistData = await fetchArtistData(artistId);

    // Очистити старий контент (опціонально)
    clearModalContent();

    // Рендер даних
    renderArtistInfo(artistData);
    renderAlbums(artistData.tracksList, artistData.strArtist);

    // Витягуємо жанри з artistData
    const genres = artistData.genres || [];
    console.log('🧪 genres container:', domRefs.artist.genres);
    renderGenres(domRefs.artist.genres, genres);
  } catch (error) {
    console.error('Помилка завантаження артиста:', error.message, error);
    alert('Artist data not found');
    closeModal();
  }
}

function clearModalContent() {
  // Якщо є області, які треба чистити перед рендером — додаємо сюди
  if (domRefs.albumsContainer) domRefs.albumsContainer.innerHTML = '';
  if (domRefs.genres) domRefs.genres.innerHTML = '';
  if (domRefs.artistInfoContainer) domRefs.artistInfoContainer.innerHTML = '';
}

initCloseModalListeners();
