const request = require('request');
const surfline = require('./lib/surfline');
const util = require('./util');

module.exports = (app) => {
  app.post('/surf', (req, res) => {
    let report = surfline.getReport().then((reports) => {
      let formattedReports = util.buildSlackMessage(reports);
      res.send(formattedReports);
    });
  });

  // NOTE: For debugging purposes to see the raw response
  app.get('/surf', (req, res) => {
    let report = surfline.getReport().then((reports) => {
      let formattedReports = util.buildSlackMessage(reports);
      res.send(formattedReports);
    });
  });

  app.get('/oath', (req, res) => {
    if (!req.query.code) {
      console.log('Missing code query string param');
      res.status(500);
      return res.send({'Error': 'Must provide a code to authenticate'});
    }

    request({
      method: 'GET',
      url: config.slack.oauthEndpoint,
      qs: {
        code: req.query.code,
        client_id: config.slack.clientId,
        client_secret: config.slack.clientSecret
      }
    }, (err, response, body) => {
      if (error) {
        console.log('Missing code query string param');
        res.status(500);
        return res.send({'Error': 'Unable to authenticate with Slack'});
      }
        res.json(body);
    });
  });
};