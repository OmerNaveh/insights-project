const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiRouter = require("./routers/apiRouter");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.listen(port, `running on ${port}`);
