import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index, className) => `<span class="${className}"></span>`,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  async function GetFeedbacksResponse() {
    try {
      const response = await axios.get(
        'https://sound-wave.b.goit.study/api/feedbacks'
      );
      const feedbacks = response.data;

      if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
        console.warn('Список відгуків порожній.');
        return;
      }

      const list = document.getElementById('feedback-list');
      list.innerHTML = '';

      const selected = [
        feedbacks[0],
        feedbacks[Math.floor(feedbacks.length / 2)],
        feedbacks[feedbacks.length - 1],
      ];

      selected.forEach((item, index) => {
        const roundedRating = Math.round(item.rating);
        const slide = document.createElement('li');
        slide.classList.add('swiper-slide');

        slide.innerHTML = `
          <div class="feedback-card">
            <div class="star-rating" data-max-rating="5" data-rating="${roundedRating}" aria-label="Rating: ${roundedRating} out of 5"></div>
            <p class="feedback-text">${item.feedback}</p>
            <p class="feedback-author">${item.author}</p>
          </div>
        `;

        list.appendChild(slide);
      });

      swiper.update();
    } catch (error) {
      console.error('Помилка завантаження відгуків:', error);
    }
  }

  console.log(GetFeedbacksResponse('Emily Davis'));
});
