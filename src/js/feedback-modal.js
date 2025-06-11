const modal = document.querySelector('.modal-feedback-backdrop');
const modalWrapper = document.querySelector('.modal-feedback-wrapper');
const form = document.querySelector('.modal-feedback-form');
const formDataWrapper = document.querySelector('.data-wrapper');
const stars = document.querySelectorAll('.modal-feedback-stars');
const closeBtn = document.querySelector('.modal-feedback-close');
const backdrop = document.querySelector('.modal-feedback-backdrop');
const submitBtn = document.querySelector('.modal-feedback-submit');
const succesMsg = document.querySelector('.succes');
const failMsg = document.querySelector('.fail');
const smiley = document.querySelector('.smiley');
const notificationsWrap = document.querySelector('.notifications');
const nameError = document.querySelector('.name-error');
const messageError = document.querySelector('.message-error');
const ratingError = document.querySelector('.rating-error');

function handleBackdropClick(e) {
  if (e.target === backdrop) closeModal();
}

function handleEscDown(e) {
  if (e.key === 'Escape') closeModal();
}

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

export async function handleFormSubmit(e) {
  e.preventDefault();

  const currentForm = e.currentTarget;
  const nameInput = currentForm.elements.modalFeedbackName;
  const messageInput = currentForm.elements.modalFeedbackMessage;
  const stars = currentForm.elements.star;
  const userData = {
    name: nameInput.value.trim(),
    descr: messageInput.value.trim(),
    rating: Number(stars.value),
  };

  //   if (!userData.name || !userData.descr || !userData.rating) {
  //     alert('Fill all fields');
  //     return;
  //   }

  nameInput.classList.remove('input-error');
  nameError.classList.remove('is-onscreen');
  if (userData.name.length < 2 || userData.name.length > 16) {
    nameInput.classList.add('input-error');
    nameError.classList.add('is-onscreen');
    return;
  }
  messageInput.classList.remove('input-error');
  messageError.classList.remove('is-onscreen');
  if (userData.descr.length < 10 || userData.descr.length > 512) {
    messageInput.classList.add('input-error');
    messageError.classList.add('is-onscreen');
    return;
  }
  ratingError.classList.remove('is-onscreen');
  if (!userData.rating) {
    ratingError.classList.add('is-onscreen');
    return;
  }

  try {
    const response = await fetch(
      'https://sound-wave.b.goit.study/api/feedbacks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong: ' + response.status);
    }

    const result = await response.json();
    console.log(result.message || 'Feedback submitted!');

    console.log(userData);

    // formDataWrapper.classList.add('slide-out-elliptic-bottom-bck');
    // submitBtn.classList.add('submited');
    // modalWrapper.classList.add('submited');

    setTimeout(() => {
      notificationsWrap.classList.remove('visually-hidden');
      succesMsg.classList.remove('visually-hidden');
      succesMsg.classList.add('is-onscreen');
      smiley.classList.remove('visually-hidden');
      smiley.classList.remove('normal');
      smiley.classList.add('is-onscreen');
      smiley.classList.add('happy');
    }, 1200);
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      notificationsWrap.classList.remove('visually-hidden');
      failMsg.classList.remove('visually-hidden');
      failMsg.classList.add('is-onscreen');
      smiley.classList.remove('visually-hidden');
      smiley.classList.add('is-onscreen');
    }, 1200);
  } finally {
    formDataWrapper.classList.add('slide-out-elliptic-bottom-bck');
    submitBtn.classList.add('submited');
    modalWrapper.classList.add('submited');

    form.reset();
    stars.forEach(star => star.classList.remove('filled'));
    setTimeout(() => {
      closeModal();
    }, 5500);
  }
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
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  modal.classList.toggle('is-open');
  form.addEventListener('submit', handleFormSubmit);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', handleBackdropClick);
  window.addEventListener('keydown', handleEscDown);

  stars.forEach(star => {
    star.addEventListener('click', handleClickStar);
    star.addEventListener('mouseover', handleStarHover);
    star.addEventListener('mouseout', handleStarMouseOut);
  });
}

export function closeModal() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  modal.classList.toggle('is-open');

  form.removeEventListener('submit', handleFormSubmit);
  closeBtn.removeEventListener('click', closeModal);

  stars.forEach(star => {
    star.removeEventListener('click', handleClickStar);
    star.removeEventListener('mouseover', handleStarHover);
    star.removeEventListener('mouseout', handleStarMouseOut);
  });
}


