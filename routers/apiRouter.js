const express = require("express");
const { retrieveData } = require("../controllers/apiController");
const router = express.Router();
router.get("/", retrieveData);
module.exports = router;
