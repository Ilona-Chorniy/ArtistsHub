import axios from 'axios';
import { openModal } from './modal';

async function getArtistsInfo(page = 1) {
  try {
    const response = await axios.get(
      `https://sound-wave.b.goit.study/api/artists?limit=8&page=${page}`
    );
    return response.data.artists;
  } catch (error) {
    console.log(error);
  }
}

const artistsList = document.querySelector('.artists-list');

let currentPage = 0;

render();

async function render() {
  const artists = await getArtistsInfo();
  const murkup = createArtistsMarkup(artists);
  artistsList.innerHTML = murkup;
  currentPage = 1;
}

// loadMore
const loadMoreBtn = document.querySelector('.artists-load-more-btn');
loadMoreBtn.addEventListener('click', loadMoreCardFoo);
async function loadMoreCardFoo() {
  try {
    showLoader();
    loadMoreBtn.style.display = 'none';
    currentPage += 1;
    const artists = await getArtistsInfo(currentPage);
    if (artists.length === 0) {
      loadMoreBtn.style.display = 'none';
    }

    const murkup = createArtistsMarkup(artists);
    artistsList.insertAdjacentHTML('beforeend', murkup);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
    loadMoreBtn.style.display = 'flex';
  }
}

function textcorrect(text, maxLength) {
  // перевірка,якщо text= und
  if (typeof text !== 'string') {
    return '';
  }
  // коректна довжина для різних розмірів екрану
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    maxLength = 60;
  } else if (screenWidth < 1440) {
    maxLength = 160;
  } else {
    maxLength = 144;
  }

  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}
function cleanText(text) {
  return text.replace(/[,/]/g, ' ');
}

// murkup
function createArtistsMarkup(arr) {
  return (
    arr
      .map(
        ({ _id, genres, strArtist, strArtistThumb, strBiographyEN }) =>
          `
      <li class="artists-card-item">

        <img class="artists-image" src="${strArtistThumb}" alt="${strArtist}"/>

        <ul class="artists-genres-list">
        ${genres
          .map(
            genre => `<li class="artists-genres-item">${cleanText(genre)}</li>`
          )
          .join('')}
        </ul>
        <p class="artists-name">${strArtist}</p>
        <p class="artists-information">${textcorrect(strBiographyEN, 144)}</p>
       <button class="artists-learn-more-card-btn open-artist-modal" data-artist-id="${_id}">
       Learn More
        <svg class="caret-right-icon" width="8" height="16" >
        <use href="/img/icons.svg#icon-caret-right"></use>
        </svg>
       </button>
     </li>
      `
      )
      .join('') || ''
  );
}
// openModal

artistsList.addEventListener('click', onArtistCardClick);
function onArtistCardClick(event) {
  // Перевіряємо, чи клікнули на кнопку "Learn More"
  // Перевіряємо, чи елемент, на який клікнули, або його батьківський елемент має клас 'open-artist-modal'
  const targetButton = event.target.closest('.open-artist-modal');

  if (targetButton) {
    // Отримуємо artistId з data-атрибута кнопки
    const artistId = targetButton.dataset.artistId;

    if (artistId) {
      // Викликаємо функцію openModal з modal.js
      openModal(artistId);
    } else {
      console.error('Artist ID not found on the clicked button.');
    }
  }
}

// loader on/off
const loader = document.querySelector('.loader');
function showLoader() {
  loader.classList.remove('visually-hidden');
}
function hideLoader() {
  loader.classList.add('visually-hidden');
}
