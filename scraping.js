const { parse } = require("node-html-parser");
const axios = require("axios");
const cron = require("node-cron");
const { unwantedChars } = require("./utils/unwantedChars");

const scrape = async (
  url,
  divSelector,
  authorSelector,
  titleSelector,
  contentSelector,
  dateSelector
) => {
  const data = [];
  const page = await axios.get(url, {
    proxy: { port: 8118, host: "localhost" },
  });
  const htmlString = page.data;
  const parsedHtml = parse(htmlString);
  const elements = parsedHtml.querySelectorAll(divSelector);
  for (let elem of elements) {
    const authorSec = elem.querySelector(authorSelector);
    const titleSec = elem.querySelector(titleSelector);
    const contentSec = elem.querySelector(contentSelector);
    const dateSec = elem.querySelector(dateSelector);
    if (!authorSec || !titleSec || !contentSec || !dateSec) continue;
    const author = authorSec.innerText.match(/(?<=by\s)(.*)(?=\sat)/)[0];
    const title = unwantedChars(titleSec.innerText);
    const content = unwantedChars(contentSec.innerText);
    const date = dateSec.innerText.match(/(?<=at\s)(.*)/)[0];
    data.push({ author, title, content, date });
  }
  console.log(data);
};

//running every two minutes using cron
cron.schedule("*/2 * * * *", () => {
  scrape(
    "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
    "#list > .row",
    ".col-sm-6",
    "h4",
    ".text",
    ".col-sm-6"
  );
});
