process.env.NODE_CONFIG_DIR = __dirname

var config = require('config')
  , path = require('path')

config.appRoot = path.dirname(__dirname)

module.exports = config