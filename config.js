module.exports = {
  port: process.env.PORT || 8080,
  slack: {
    oauthEndpoint: process.env.SLACK_OAUTH_ENDPOINT,
    webhook: process.env.SLACK_WEBHOOK_ENDPOINT,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET
  },
  surfline: {
    baseUrl: process.env.SURFLINE_BASE_URL
  }
};