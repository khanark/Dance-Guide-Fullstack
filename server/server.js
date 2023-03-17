const express = require("express");
const CORS = require("cors");
const router = require("./config/routes");
const database = require("./config/database.js");
const trimmer = require("./middlewares/trimmer");

const app = express();
const port = process.env.PORT || 3030;

const start = async () => {
  app.use(express.json());
  app.use(CORS());
  app.use(trimmer());

  await database();
  router(app);

  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

start();
