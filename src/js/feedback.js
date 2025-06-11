import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import axios from 'axios';
import { openFeedbackModal } from './feedback-modal.js';

import 'css-star-rating/css/star-rating.min.css';

document.addEventListener('DOMContentLoaded', async () => {
  const slides = await loadFeedbacks();
  if (slides.length >= 3) initSwiper();
});

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api/';

async function loadFeedbacks() {
  try {
    const response = await axios.get(
      'https://sound-wave.b.goit.study/api/feedbacks',
      { params: { limit: 3, page: 1 } }
    );
    const feedbacks = Array.isArray(response.data)
      ? response.data
      : response.data.data;

    console.log('Отримано відгуків:', feedbacks);

    if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
      console.warn('Список відгуків порожній.');
      return [];
    }

    renderFeedbacks(feedbacks);
    return feedbacks;
  } catch (err) {
    console.error('Помилка при завантаженні відгуків:', err);
    document.getElementById('feedback-container').innerHTML =
      '<li class="swiper-slide"><p>Відгуки недоступні.</p></li>';
    return [];
  }
}

function renderFeedbacks(feedbacks) {
  const wrapper = document.getElementById('feedback-container');
  wrapper.innerHTML = '';

  feedbacks.forEach(item => {
    const r = Math.round(item.rating);
    wrapper.insertAdjacentHTML(
      'beforeend',
      `
      <li class="swiper-slide">
        <div class="feedback-card">
          <div class="rating value-${r}" aria-label="Rating: ${r} з 5"></div>
          <p class="feedback-text">${item.descr}</p>
          <p class="feedback-author">${item.name}</p>
        </div>
      </li>`
    );
  });
}

function initSwiper() {
  new Swiper('.feedback-swiper', {
    loop: true,
    pagination: {
      el: '.custom-pagination',
      clickable: true,
      renderBullet: (i, cls) => `<span class="${cls}"></span>`,
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
  });
}

const btn = document.querySelector('#open-feedback');
if (btn) {
  btn.addEventListener('click', () => {
    openFeedbackModal();
  });
}
