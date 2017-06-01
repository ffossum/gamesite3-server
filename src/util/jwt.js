const { promisify } = require('util');
const jwt = require('jsonwebtoken');

module.exports = {
  verifyJwt: promisify(jwt.verify),
  signJwt: promisify(jwt.sign),
};
