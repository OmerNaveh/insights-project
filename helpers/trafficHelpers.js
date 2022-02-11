exports.generateTrafficObj = () => {
  const traffic = {};
  for (let i = 0; i < 24; i++) {
    traffic[i] = 0;
  }
  return traffic;
};
