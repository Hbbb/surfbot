const request = require('request-promise-native');
const config = require('../config');

const buildReportText = (report) => {
  return `${report.Analysis.surfRange[0]}\n${report.Analysis.generalCondition}`;
};

const extractReportData = (report) => {
  return {
    name: report.name,
    longText: report.Analysis.generalText[0],
    text: buildReportText(report),
    condition: report.Analysis.generalCondition
  }
};

const processReports = (reports) => {
  return (
    reports
      .map(val => JSON.parse(val))
      .map(val => extractReportData(val))
  )
};

module.exports = {
  getReport: () => {
    let reports = [
      request.get(`${config.surfline.baseUrl}/2953?resources=analysis&days=1&usenearshore=true&getAllSpots=false`),
      request.get(`${config.surfline.baseUrl}/2144?resources=analysis&days=1&usenearshore=true&getAllSpots=false`)
    ];

    return Promise.all(reports)
      .then(values => processReports(values));
  }
};
