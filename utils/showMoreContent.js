const axios = require("axios");
const { parse } = require("node-html-parser");
const proxy = {
  proxy: { port: 8118, host: "tor-proxy" },
};
/**
 * Gathers full content from selected paste
 * @return {HTMLElement} containing string value of paste's content
 **/
exports.showMoreContent = async (url, querySelector) => {
  const showMorePage = await axios.get(url, proxy);
  const htmlString = showMorePage.data;
  const parsedHtml = parse(htmlString);
  return parsedHtml.querySelector(querySelector);
};
