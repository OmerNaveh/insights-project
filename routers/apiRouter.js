const express = require("express");
const { retrieveData } = require("../controllers/apiController");
const { connectToSSE } = require("../middlewares/connectToSSE");
const router = express.Router();
router.get("/", connectToSSE, retrieveData);
module.exports = router;
