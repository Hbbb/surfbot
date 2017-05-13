const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const mountRoutes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mountRoutes(app);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
