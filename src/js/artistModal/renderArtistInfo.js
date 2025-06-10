import { domRefs } from './domRefs.js';

export function renderArtistInfo(data) {
  const { name, thumb, years, gender, members, country, bio } = domRefs.artist;

  name.textContent = data.strArtist ?? 'No name';
  thumb.src =
    data.strArtistThumb || 'https://via.placeholder.com/200x200?text=No+Image';
  thumb.alt = `Artist photo ${data.strArtist ?? ''}`;
  bio.textContent = data.strBiographyEN ?? 'No description';

  years.textContent = data.intFormedYear
    ? `${data.intFormedYear} - ${data.intDiedYear || 'present'}`
    : 'No data';
  gender.textContent = data.strGender || 'No data';
  members.textContent = data.intMembers || 'No data';
  country.textContent = data.strCountry || 'No data';
}
