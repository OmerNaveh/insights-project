const axios = require("axios");
const { parse } = require("node-html-parser");
const proxy = {
  proxy: { port: 8118, host: "localhost" },
};

exports.showMoreContent = async (url, querySelector) => {
  const showMorePage = await axios.get(url, proxy);
  const htmlString = showMorePage.data;
  const parsedHtml = parse(htmlString);
  return parsedHtml.querySelector(querySelector);
};
