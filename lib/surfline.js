const request = require('request-promise-native');
const BASE_URL = 'http://api.surfline.com/v1/forecasts/';

module.exports = {
  getReport: () => {
    let reports = [
      request.get(`${BASE_URL}/2953?resources=analysis&days=1&usenearshore=true&getAllSpots=false`),
      request.get(`${BASE_URL}/2953?resources=analysis&days=1&usenearshore=true&getAllSpots=false`)
    ];

    return Promise.all(reports).then(values =>
      values.map(val => JSON.parse(val))
    );
  }
};
