const domRefs = {
  modal: document.getElementById('artistModal'),
  closeModalBtn: document.querySelector('#artistModal .modal__close-button'),
  overlay: document.querySelector('#artistModal .modal__overlay'),
  openModalBtn: document.querySelector('.open-artist-modal'),

  name: document.querySelector('.artist-card__name'),
  thumb: document.querySelector('.artist-card__photo'),
  country: document.querySelector(
    '.artist-card__info-country .artist-card__value'
  ),

  yearsActive: document.querySelector(
    '.artist-card__info-years-active .artist-card__value'
  ),
  members: document.querySelector(
    '.artist-card__info-members .artist-card__value'
  ),
  gender: document.querySelector('.artist-card__info-sex .artist-card__value'),
  bio: document.querySelector('.artist-card__description'),

  genresContainer: document.querySelector('.artist-card__info-genres'),
  genresList: document.querySelector('.artist-card__genres-list'),

  //albumsContainer: document.querySelector('.artist-card__albums-container'),
  //albumsList: document.querySelector('.artist-card__albums-list'),
};

export default domRefs;
