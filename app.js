const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const config = require('./config');
const mountRoutes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mountRoutes(app);

// 404 handler, fowards to default error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.json(status, {message: err.message});
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
