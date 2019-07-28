const request = require('request-promise');

module.exports = ({ accountUri, clientId, callbackUri }) => ({
  get: (req, res) => {
    res.sendFile(__dirname + '/signin.html');
  },
  post: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const { accessToken } = await request({
        uri: accountUri + '/oauth/signin',
        method: 'POST',
        body: {
          clientId,
          username,
          password
        },
        json: true
      });

      res.redirect(`${callbackUri}?access_token=${accessToken}`);
    } catch (error) {
      next(new Error('Signin failure'));
    }
  }
});
