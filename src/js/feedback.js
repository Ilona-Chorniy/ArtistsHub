import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import axios from 'axios';

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
export async function GetFeedbacksResponse(query, page = 1) {
  const baseURL = 'https://sound-wave.b.goit.study/api/';
  const endPoint = '/feedbacks';
  const url = baseURL + endPoint;

  const params = {
    q: query,
    page: page,
    limit: 3,
  };

  const res = await axios.get(url, { params });

  return res.data;
}

//===================================================================//
