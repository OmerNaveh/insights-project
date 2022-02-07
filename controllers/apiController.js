const Scrape = require("../mongo/models");
exports.retrieveData = () => {
  return Scrape.find({});
};
