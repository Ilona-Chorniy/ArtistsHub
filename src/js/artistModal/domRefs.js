export const domRefs = {
  modal: document.querySelector('.modal'),
  // link to loader and spinner
  artistDataLoader: document.getElementById('artistDataLoader'),
  artistDataSpinner: document.querySelector('#artistDataLoader .spinner'),

  artist: {
    name: document.querySelector('.artist-name'),
    thumb: document.querySelector('.artist-thumb'),
    years: document.querySelector('.artist-years'),
    gender: document.querySelector('.artist-gender'),
    members: document.querySelector('.artist-members'),
    country: document.querySelector('.artist-country'),
    bio: document.querySelector('.artist-bio'),
    genres: document.querySelector('.artist-genres'),
  },
  albums: {
    container: document.querySelector('.albums-container'),
  },
  artistCardSection: document.querySelector('.artist-card'),
};
