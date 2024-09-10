export const getHeatmapColor = (percentage: number) => {
  const intensity = Math.floor(200 * (percentage / 100));
  return `rgb(${255 - intensity}, 0, 0)`;
};
