const modal = document.querySelector('.modal-feedback-section');
const form = document.querySelector('.modal-feedback-form');
const stars = document.querySelectorAll('.modal-feedback-stars');
const closeBtn = document.querySelector('.modal-feedback-close');

export function handleClickStar(event) {
  const rating = parseInt(event.currentTarget.dataset.value, 10);

  stars.forEach(star => {
    const val = parseInt(star.dataset.value, 10);
    star.classList.toggle('filled', val <= rating);
  });

  const radionInput = document.getElementById('radio-${rating}');
  if (radionInput) {
    radionInput.checked = true;
  }
}

export function handleFormSubmit(e) {
  e.preventDefault();
  const currentForm = e.currentTarget;
  const userData = {
    name: currentForm.elements.modalFeedbackName.value.trim(),
    message: currentForm.elements.modalFeedbackMessage.value.trim(),
    rating: currentForm.elements.star.value,
  };

  console.log(userData);

  form.reset();
  stars.forEach(star => {
    star.classList.remove('filled');
  });
}

export function handleStarHover(event) {
  const hoverRating = parseInt(event.currentTarget.dataset.value, 10);
  stars.forEach(star => {
    const val = parseInt(star.dataset.value, 10);
    star.classList.toggle('hovered', val <= hoverRating);
  });
}

export function handleStarMouseOut() {
  stars.forEach(star => star.classList.remove('hovered'));
}

export function openFeedbackModal() {
  form.addEventListener('submit', handleFormSubmit);
  closeBtn.addEventListener('click', closeModal);

  stars.forEach(star => {
    star.addEventListener('click', handleClickStar);
    star.addEventListener('mouseover', handleStarHover);
    star.addEventListener('mouseout', handleStarMouseOut);
  });
}

export function closeModal() {
  modal.classList.add('visually-hidden');

  form.removeEventListener('submit', handleFormSubmit);
  closeBtn.removeEventListener('click', closeModal);

  stars.forEach(star => {
    star.removeEventListener('click', handleClickStar);
    star.removeEventListener('mouseover', handleStarHover);
    star.removeEventListener('mouseout', handleStarMouseOut);
  });
}
