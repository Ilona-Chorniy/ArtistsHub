import { domRefs } from './domRefs.js';

function closeModal() {
  domRefs.modal.classList.add('modal--hidden');
  document.body.classList.remove('no-scroll');
}

function initCloseModalListeners() {
  const closeButton = document.querySelector('.modal__close-button');
  const overlay = document.querySelector('.modal');

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
  if (overlay) {
    overlay.addEventListener('click', event => {
      if (event.target === overlay) {
        closeModal();
      }
    });
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
