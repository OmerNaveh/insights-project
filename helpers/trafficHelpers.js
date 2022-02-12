/**
 * Create Object With Keys of all hours in a day
 *
 * @return {Object} Key: Time of day, Value: 0
 */
exports.generateTrafficObj = () => {
  const traffic = {};
  for (let i = 0; i < 24; i++) {
    traffic[i] = 0;
  }
  return traffic;
};
