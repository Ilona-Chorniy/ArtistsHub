import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import axios from 'axios';

import 'css-star-rating/css/star-rating.min.css';

document.addEventListener('DOMContentLoaded', async () => {
  const slides = await loadFeedbacks();
  if (slides.length >= 3) initSwiper();
});

async function loadFeedbacks() {
  try {
    const { data } = await axios.get(
      'https://sound-wave.b.goit.study/api/feedbacks'
    );

    console.log(data);

    if (!Array.isArray(data) || data.length === 0) {
      console.warn('Список відгуків порожній.');
      return [];
    }
    const selected = [
      data[0],
      data[Math.floor(data.length / 2)],
      data[data.length - 1],
    ];
    renderFeedbacks(selected);
    return selected;
  } catch (err) {
    console.error('Помилка при завантаженні відгуків:', err);
    return [];
  }
}

function renderFeedbacks(feedbacks) {
  const wrapper = document.getElementById('feedback-list');
  wrapper.innerHTML = '';

  feedbacks.forEach(item => {
    const r = Math.round(item.rating);
    wrapper.insertAdjacentHTML(
      'beforeend',
      `
      <li class="swiper-slide">
        <div class="feedback-card">
          <div
            class="star-rating"
            data-rating="${r}"
            data-max-rating="5"
            data-read-only="true"
            aria-label="Rating: ${r} out of 5"
          ></div>
          <p class="feedback-text">${item.descr}</p>
          <p class="feedback-author">${item.name}</p>
        </div>
      </li>
    `
    );
  });

  document
    .querySelectorAll('.star-rating')
    .forEach(el => new window.StarRating(el));
}

function initSwiper() {
  new Swiper('.swiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
