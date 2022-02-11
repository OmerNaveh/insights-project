const Scrape = require("../mongo/models");
const { generateTrafficObj } = require("./trafficHelpers");

exports.traffic = async () => {
  const traffic = generateTrafficObj();
  try {
    const initialData = await Scrape.find({});
    initialData.forEach((paste) => {
      traffic[paste.date.getHours()]++;
    });
    return traffic;
  } catch (error) {
    console.log(error);
  }
};
