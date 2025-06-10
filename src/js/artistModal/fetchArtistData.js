import axios from 'axios';

export async function fetchArtistData(artistId) {
  if (!artistId) {
    throw new Error('Artist ID is required');
  }
  const [artistRes, allArtistsRes] = await Promise.all([
    axios.get(`https://sound-wave.b.goit.study/api/artists/${artistId}`),
    axios.get(`https://sound-wave.b.goit.study/api/artists`),
  ]);

  const artistData = artistRes.data;

  // 🧠 Виправлення тут:
  const allArtists = allArtistsRes.data.artists || [];

  if (!artistData?.strArtist) throw new Error('No artist data');
  console.log('🔍 artistId:', artistId);

  const fullArtistData = allArtists.find(artist => artist._id === artistId);

  if (!fullArtistData) {
    console.warn('⚠️ Artist not found in allArtists:', artistId);
  } else if (fullArtistData.genres) {
    artistData.genres = fullArtistData.genres;
  }

  console.log('🎯 жанри:', allArtists);
  console.log('🎯 жанри:', fullArtistData);

  console.log('typeof artistId:', typeof artistId, artistId);
  console.log(
    'sample allArtists._id:',
    allArtists[0]._id,
    typeof allArtists[0]._id
  );

  return artistData;
}
