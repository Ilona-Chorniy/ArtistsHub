//modal.js
import { domRefs } from './artistModal/domRefs.js';
import {
  closeModal,
  initCloseModalListeners,
  handleEscDownModal,
} from './artistModal/closeModal.js';
import { fetchArtistData } from './artistModal/fetchArtistData.js';
import { renderArtistInfo } from './artistModal/renderArtistInfo.js';
import { renderAlbums } from './artistModal/renderAlbums.js';
import { renderGenres } from './artistModal/renderGenres.js';
import loader from './artistModal/utils/loader.js';

let loaderTimerId = null;
// час затримки для лоадера (в мілісекундах)
const LOADER_DELAY_MS = 300;

// Function to open the modal and fetch artist data
export async function openModal(artistId) {
  //  Show the loader

  try {
    // Show the modal
    domRefs.modal.classList.remove('modal--hidden');
    document.body.classList.add('no-scroll');

    // Show the loader after a delay
    loaderTimerId = setTimeout(() => {
      loader.showArtistLoader();
    }, LOADER_DELAY_MS);

    // Get artist data
    const artistData = await fetchArtistData(artistId);
    loader.showArtistLoader();
    // Clear old content
    clearModalContent();

    // Render artist data
    renderArtistInfo(artistData);
    renderAlbums(artistData.tracksList, artistData.strArtist);

    // Render artist info
    const genres = artistData.genres || [];
    console.log('🧪 genres container:', domRefs.artist.genres);
    renderGenres(domRefs.artist.genres, genres);
  } catch (error) {
    console.error('Error to load artist data:', error.message, error);
    alert('Artist data not found');
    closeModal();
  } finally {
    if (loaderTimerId) {
      clearTimeout(loaderTimerId);
      loaderTimerId = null;
    }
    // Hide the loader
    loader.hideArtistLoader();
  }
}

function clearModalContent() {
  // Clear all content in the modal

  if (domRefs.albumsContainer) domRefs.albumsContainer.innerHTML = '';
  if (domRefs.genres) domRefs.genres.innerHTML = '';
  if (domRefs.artistInfoContainer) domRefs.artistInfoContainer.innerHTML = '';
}

// Initialize close modal listeners
initCloseModalListeners();
// document.removeEventListener('keydown', handleEscDownModal);
