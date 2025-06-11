
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('modal-close');

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});
