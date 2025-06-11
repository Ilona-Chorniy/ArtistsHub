import axios from 'axios';

export let allArtists = [];
export const genresMap = new Map();

export async function fetchAllArtistsAndGenres() {
  try {
    const { data } = await axios.get(
      'https://sound-wave.b.goit.study/api/artists'
    );
    allArtists = data.artists;

    // We generate genresMap dynamically
    allArtists.forEach(artist => {
      const genres = artist.genres || [];
      genresMap.set(artist._id, genres);
    });

    return allArtists;
  } catch (error) {
    console.error('Failed to fetch artists:', error);
    return [];
  }
}
