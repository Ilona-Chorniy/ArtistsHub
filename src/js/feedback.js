import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
//===================================================================//
import axios from 'axios';

export async function GetFeedbacksResponse(query, page) {
  const baseURL = 'https://sound-wave.b.goit.study/api/';
  const endPoint = '/feedbacks';
  const url = baseURL + endPoint;

  const params = {
    q: query,
    page: page,
    limit: 3,
  };
  const headers = {};

  const res = await axios.get(url, { params, headers });

  return res.data;
}
