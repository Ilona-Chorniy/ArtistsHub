import { openModal } from '../../modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.open-artist-modal');

  if (!button) return;

  button.addEventListener('click', async () => {
    const artistId = button.dataset.artistId;
    console.log('▶️ ID для модалки:', artistId);
    await openModal(artistId); // ✅ чекаємо на завантаження артиста
  });
});
