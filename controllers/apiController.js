const Scrape = require("../mongo/models");
const { scrape } = require("../scraping");
const { clients } = require("../middlewares/clients");
const { analysis } = require("../helpers/analytics");
exports.retrieveData = async (req, res, next) => {
  const entries = await Scrape.find({});
  const analytics = await analysis();
  const data = { entries, analytics };
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
  // call on scrape and send the new message to all active clients
  // setTimeout(async () => {
  //   await scrape(
  //     "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
  //     "#list > .row",
  //     ".col-sm-6",
  //     "h4",
  //     ".text",
  //     ".col-sm-6"
  //   );
  //   console.log("scrapped");
  //   this.retrieveData(req, res, next);
  // }, 2000);
};
