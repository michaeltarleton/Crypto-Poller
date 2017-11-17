'use strict'

require('make-promises-safe')

var logger = require('./logger')
  , settings = require('./config')
  , modules = require('./modules')

modules.gdax.getAccounts()