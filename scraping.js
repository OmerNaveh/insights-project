const { parse } = require("node-html-parser");
const axios = require("axios");
const { unwantedChars } = require("./utils/unwantedChars");
const { showMoreContent } = require("./utils/showMoreContent");
const Scrape = require("./mongo/models");
const proxy = {
  proxy: { port: 8118, host: "tor-proxy" },
};
exports.scrape = async (
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
      }
    } catch {
      continue;
    }
  }
};
