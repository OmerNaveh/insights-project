const { parse } = require("node-html-parser");
const axios = require("axios");
const cron = require("node-cron");
const { unwantedChars } = require("./utils/unwantedChars");
const { showMoreContent } = require("./utils/showMoreContent");
const Scrape = require("./mongo/models");
const mongoose = require("mongoose");
const { retrieveData } = require("./controllers/apiController");
const proxy = {
  proxy: { port: 8118, host: "localhost" },
};
const scrape = async (
  url,
  divSelector,
  authorSelector,
  titleSelector,
  contentSelector,
  dateSelector
) => {
  const page = await axios.get(url, proxy);
  const htmlString = page.data;
  const parsedHtml = parse(htmlString);
  const elements = parsedHtml.querySelectorAll(divSelector);
  for (let elem of elements) {
    const authorSec = elem.querySelector(authorSelector);
    const titleSec = elem.querySelector(titleSelector);
    const moreContentHref = elem.querySelector("a");
    const dateSec = elem.querySelector(dateSelector);
    if (!authorSec || !titleSec || !moreContentHref || !dateSec) continue;
    try {
      const contentSec = await showMoreContent(
        moreContentHref.attrs.href,
        contentSelector
      );
      const author = authorSec.innerText.match(/(?<=by\s)(.*)(?=\sat)/)[0];
      const title = unwantedChars(titleSec.innerText);
      const content = unwantedChars(contentSec.innerText);
      const date = dateSec.innerText.match(/(?<=at\s)(.*)/)[0];
      const entry = new Scrape({
        author,
        title,
        content,
        date: new Date(date),
      });
      if (!(await Scrape.exists({ title, content, author }))) {
        await entry.save();
        await retrieveData(); //send new data to all users connected to server
      }
    } catch {
      continue;
    }
  }
  mongoose.connection.close();
};

scrape(
  "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
  "#list > .row",
  ".col-sm-6",
  "h4",
  ".text",
  ".col-sm-6"
);
// running every two minutes using cron
// cron.schedule("*/2 * * * *", () => {
//   scrape(
//     "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
//     "#list > .row",
//     ".col-sm-6",
//     "h4",
//     ".text",
//     ".col-sm-6"
//   );
// });
