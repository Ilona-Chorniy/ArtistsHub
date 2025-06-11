export function groupTracksByAlbum(tracks, artistName) {
  return tracks.reduce((map, track) => {
    if (track.strArtist !== artistName) return map;
    const album = track.strAlbum || 'Unknown Album';
    if (!map[album]) map[album] = [];
    map[album].push(track);
    return map;
  }, {});
}
