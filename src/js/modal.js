// src/js/modal.js
import domRefs from './artistModal/domRefs'; // Переконайтеся, що шлях правильний
import { closeModal, initCloseModalListeners } from './artistModal/closeModal'; // Імпортуємо функції закриття

document.addEventListener('DOMContentLoaded', () => {
  // Деструктуризуємо об'єкт domRefs для зручного доступу до посилань
  const {
    modal, // Залишаємо modal, оскільки він використовується в openModal
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

  // Функція для відкриття модалки та завантаження даних
  async function openModal(artistId) {
    try {
      modal.classList.remove('modal--hidden');

      const response = await fetch(
        `https://sound-wave.b.goit.study/api/artists/${artistId}`
      );
      if (!response.ok) {
        throw new Error('Помилка при завантаженні даних артиста');
      }

      const data = await response.json();
      console.log('Отримані дані:', data);

      if (!data || !data.strArtist) {
        throw new Error('Дані артиста не знайдено');
      }

      // Заповнюємо поля модалки, використовуючи domRefs
      name.textContent = data.strArtist || 'Без імені';
      thumb.src = data.strArtistThumb || 'path/to/default-photo.jpg'; // Замініть на реальний шлях
      thumb.alt = `Фото виконавця ${data.strArtist || ''}`;
      bio.textContent = data.strBiographyEN || 'Опис відсутній';

      // Заповнення додаткових полів
      yearsActive.textContent = data.intFormedYear
        ? `${data.intFormedYear} - ${data.intDiedYear || 'теперішній час'}`
        : 'Н/Д';
      gender.textContent = data.strGender || 'Н/Д';
      members.textContent = data.intMembers || 'Н/Д';
      country.textContent = data.strCountry || 'Н/Д';

      // Очищаємо жанри та додаємо нові
      genresList.innerHTML = '';
      if (Array.isArray(data.genres) && data.genres.length > 0) {
        data.genres.forEach(genre => {
          const genreEl = document.createElement('span');
          genreEl.classList.add('artist-card__info-genres-item');
          genreEl.textContent = genre;
          genresList.appendChild(genreEl);
        });
      } else {
        const noGenresEl = document.createElement('span');
        noGenresEl.classList.add('artist-card__info-genres-item');
        noGenresEl.textContent = 'Жанри відсутні';
        genresList.appendChild(noGenresEl);
      }
    } catch (error) {
      console.error(error);
      alert('Не вдалося завантажити дані артиста.');
      closeModal();
    }
  }

  // Обробники подій
  openModalBtn.addEventListener('click', () => {
    const artistId = openModalBtn.dataset.artistId;
    if (artistId) {
      openModal(artistId);
    } else {
      console.error('Artist ID не знайдено на кнопці.');
      alert('Не вдалося визначити ID артиста.');
    }
  });

  // Ініціалізуємо обробники подій закриття модалки
  initCloseModalListeners();
});
