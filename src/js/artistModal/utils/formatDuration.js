// artistModal/utils/formatDuration.js

/**
 * Converts duration in milliseconds to the format "mm:ss"
 * @param {number} ms - Тduration in milliseconds
 * @returns {string} - formatted duration (e.g., "3:45")
 */
export function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
