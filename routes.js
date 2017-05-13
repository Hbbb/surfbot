const request = require('request');
const surfline = require('./lib/surfline');
const util = require('./util');

module.exports = (app) => {
  app.get('/surf', (req, res) => {
    let report = surfline.getReport().then((reports) => {
      let formattedReports = reports.map((report) => {
        return util.formatSlackMessage({
          color: 'blue',
          title: 'Surf Report',
          body: report.text
        });
      });

      res.send(formattedReports);
    });
  });

  app.post('/ngrok', (req, res) => {
    let commandArguments = req.body.text;
    res.send(`Ngrok tunnel is up and running! Arguments: ${commandArguments}`);
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