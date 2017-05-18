// TODO
const conditionColorMap = {};

module.exports = {
  buildSlackMessage: (surfReports) => {
    const reportAttachments = surfReports.map((report) => {
      return {title: report.name, pretext: report.longText, text: report.text, color: '#3081B8'}
    });

    return {
      response_type: 'in_channel',
      mrkdwn: true,
      attachments: reportAttachments
    }
  }
};