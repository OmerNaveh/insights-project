exports.unwantedChars = (str) => {
  return str.replace(/\n|\t|&nbsp;|<|>/g, "");
};
