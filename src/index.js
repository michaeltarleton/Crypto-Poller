'use strict'

require('make-promises-safe')

var logger = require('./logger')
  , settings = require('./config')
  , modules = require('./modules')
  , emailer = require('./email')