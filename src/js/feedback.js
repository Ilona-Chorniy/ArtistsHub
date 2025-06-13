import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import axios from 'axios';
import { openFeedbackModal } from './feedback-modal.js';

document.addEventListener('DOMContentLoaded', async () => {
  const slides = await loadFeedbacks();
  if (slides.length >= 3) initSwiper();
});

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';

async function loadFeedbacks() {
  try {
    const allRes = await axios.get('/feedbacks', {
      params: { limit: 25, page: 1 },
    });

    const all = Array.isArray(allRes.data) ? allRes.data : allRes.data.data;

    console.log('Усі відгуки з бекенду:', all);

    if (!Array.isArray(all) || all.length === 0) {
      console.warn('Список відгуків порожній.');
      return [];
    }

    renderFeedbacks(all);
    return all;
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
    speed: 1000,
    loop: true,
    pagination: {
      el: '.custom-pagination',
      clickable: true,
      renderBullet: (i, cls) => {
        if (i < 3) {
          return `<span class="${cls}"></span>`;
        }
        return '';
      },
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