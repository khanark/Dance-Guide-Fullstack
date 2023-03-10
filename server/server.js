const express = require('express');
const CORS = require('cors');
const router = require('./config/routes');
const database = require('./config/database.js');
const trimmer = require('./middlewares/trimmer');

const app = express();
const port = process.env.PORT || 3000;

const start = async () => {
  app.use(express.json());
  app.use(CORS());
  app.use(trimmer());

  app.get(['/', '/:name'], (req, res) => {
    greeting = '<h1>Hello From Node on Fly!</h1>';
    currentName = req.params['name'];
    if (currentName) {
      res.send(greeting + '</br>and hello to ' + name);
    } else {
      res.send(greeting);
    }
  });

  await database();
  router(app);

  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

start();
