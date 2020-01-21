module.exports = (longitude, latitude) => {
  return { type: 'Point', coordinates: [longitude, latitude] };
};
