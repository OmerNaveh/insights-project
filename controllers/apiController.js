const Scrape = require("../mongo/models");
const { clients } = require("../middlewares/clients");
const { analysis } = require("../helpers/analytics");
exports.retrieveData = async (req, res, next) => {
  const entries = await Scrape.find({});
  const analytics = await analysis();
  const data = { entries, analytics };
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};
