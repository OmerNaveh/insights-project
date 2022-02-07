const Scrape = require("../mongo/models");
exports.retrieveData = async (req, res, next) => {
  const data = await Scrape.find({});
  res.send(data);
};
