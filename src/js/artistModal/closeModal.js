import { domRefs } from './domRefs.js';

function closeModal() {
  domRefs.modal.classList.add('modal--hidden');
  document.body.classList.remove('no-scroll');
}

function initCloseModalListeners() {
  const closeButton = domRefs.closeButton;
  const overlay = domRefs.overlay;

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

  // document.addEventListener('keydown', handleEscDownModal);
  document.addEventListener('keydown', handleEscDownModal);
  //
}

function handleEscDownModal(e) {
  if (
    e.key === 'Escape' &&
    !domRefs.modal.classList.contains('modal--hidden')
  ) {
    closeModal();
  }
}

export { closeModal, initCloseModalListeners, handleEscDownModal };
