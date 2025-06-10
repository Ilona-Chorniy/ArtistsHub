import { domRefs } from './domRefs.js';
import { formatDuration } from '../artistModal/utils/formatDuration.js';
import { groupTracksByAlbum } from './groupTracksByAlbum.js';

export function renderAlbums(tracksList, artistName) {
  const albumsContainer = domRefs.albums.container;
  if (!albumsContainer) return;

  const albumsMap = groupTracksByAlbum(tracksList, artistName); // Обʼєкт: { albumName: [tracks] }
  albumsContainer.innerHTML = '';

  const ul = document.createElement('ul');
  ul.classList.add('albums__card-list');

  for (const [albumName, tracks] of Object.entries(albumsMap)) {
    const albumItem = document.createElement('li');
    albumItem.className = 'albums__name-item albums-name';

    const title = document.createElement('h4');
    title.className = 'albums__name-title';
    title.textContent = albumName;
    albumItem.appendChild(title);

    const wrapper = document.createElement('div');
    wrapper.className = 'albums__track-option';

    // Заголовки колонок
    const headerList = document.createElement('ul');
    headerList.className = 'albums__track-list-option';
    headerList.innerHTML = `
      <li class="albums__track-item">track</li>
      <li class="albums__time-item">time</li>
      <li class="albums__link-item">link</li>
    `;
    wrapper.appendChild(headerList);

    // Список треків
    tracks.forEach(track => {
      const trackList = document.createElement('ul');
      trackList.className = 'albums__track-list';

      const name = document.createElement('li');
      name.className = 'albums__track-name';
      name.textContent = track.strTrack || '';

      const time = document.createElement('li');
      time.className = 'albums__trak-time';
      time.textContent = track.intDuration
        ? formatDuration(track.intDuration)
        : '';

      const link = document.createElement('li');
      link.className = 'albums__trak-link';

      if (track.movie) {
        const a = document.createElement('a');
        a.href = track.movie;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = `
        <svg width="16" height="16">
          <use href="icons.svg#icon-youtube"></use>
        </svg>`;
        link.appendChild(a);
      }

      trackList.append(name, time, link);
      wrapper.appendChild(trackList);
    });

    albumItem.appendChild(wrapper);
    ul.appendChild(albumItem);
  }

  albumsContainer.appendChild(ul);
}
