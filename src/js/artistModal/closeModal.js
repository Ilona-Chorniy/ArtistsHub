// closeModal.js
import { domRefs } from './domRefs.js';

let handleEscape;
let handleOverlayClick;
let handleCloseClick;

function closeModal() {
  domRefs.modal.classList.add('modal--hidden');
  document.body.classList.remove('no-scroll');

  // ❌ Прибираємо слухачі
  document.removeEventListener('keydown', handleEscape);
  domRefs.modal.removeEventListener('click', handleOverlayClick);

  const closeButton = document.querySelector('.modal__close-button');
  if (closeButton) {
    closeButton.removeEventListener('click', handleCloseClick);
  }
}

function initCloseModalListeners() {
  const closeButton = document.querySelector('.modal__close-button');
  handleEscape = event => {
    if (
      event.key === 'Escape' &&
      !domRefs.modal.classList.contains('modal--hidden')
    ) {
      closeModal();
    }
  };

  handleOverlayClick = event => {
    if (event.target === domRefs.modal) {
      closeModal();
    }
  };

  handleCloseClick = () => {
    closeModal();
  };

  if (closeButton) {
    closeButton.addEventListener('click', handleCloseClick);
  }

  domRefs.modal.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscape);
}

export { closeModal, initCloseModalListeners };
