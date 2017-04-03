var path = require('path')

module.exports = {
  httpPort: process.env.PORT || 8080,
  staticFolder: path.join(__dirname + '/../../../client')
};