const Scrape = require("../mongo/models");
const { clients } = require("../middlewares/clients");
exports.retrieveData = async (req, res, next) => {
  const data = await Scrape.find({});
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};
