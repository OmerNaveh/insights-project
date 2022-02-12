const Scrape = require("../mongo/models");
const { generateTrafficObj } = require("./trafficHelpers");

/**
 * Gathers traffic data from db
 *
 * @return {Object} Key: Time of day, Value: Number of pastes created at that time
 */
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
