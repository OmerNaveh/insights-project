const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGOURI).then(console.log("Connected to DB..."));

const scrapeSchema = mongoose.Schema({
  author: String,
  title: String,
  content: String,
  date: Date,
});

const Scrape = mongoose.model("scrape", scrapeSchema);
module.exports = Scrape;
