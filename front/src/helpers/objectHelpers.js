export const getObjectNoTotal = (obj) => {
  const duplicate = { ...obj };
  delete duplicate.total;
  return duplicate;
};
