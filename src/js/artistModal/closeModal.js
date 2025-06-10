import { domRefs } from './domRefs.js';

function closeModal() {
  domRefs.modal.classList.add('modal--hidden');
  // можна тут очищати контент, якщо треба
}

function initCloseModalListeners() {
  const closeButton = document.querySelector('.modal__close-button');
  const overlay = document.querySelector('.modal__overlay');

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', event => {
    if (
      event.key === 'Escape' &&
      !domRefs.modal.classList.contains('modal--hidden')
    ) {
      closeModal();
    }
  });
}

export { closeModal, initCloseModalListeners };
