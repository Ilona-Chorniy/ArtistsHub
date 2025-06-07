// src/js/artistModal/closeModal.js
import domRefs from './domRefs';

// Деструктуризуємо об'єкт domRefs для зручного доступу до посилань
const {
  modal,
  closeModalBtn,
  overlay,
  name,
  thumb,
  yearsActive,
  gender,
  members,
  country,
  bio,
  genresList,
} = domRefs;

// Функція для закриття модалки
function closeModal() {
  modal.classList.add('modal--hidden');

  // Очищаємо поля при закритті модалки, використовуючи domRefs
  name.textContent = '';
  thumb.src = '';
  thumb.alt = '';
  bio.textContent = '';
  yearsActive.textContent = '';
  gender.textContent = '';
  members.textContent = '';
  country.textContent = '';
  genresList.innerHTML = '';
}

// Функція для ініціалізації обробників подій закриття
function initCloseModalListeners() {
  closeModalBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    // Перевіряємо наявність класу 'modal--hidden'
    if (e.key === 'Escape' && !modal.classList.contains('modal--hidden')) {
      closeModal();
    }
  });
}

export { closeModal, initCloseModalListeners };
