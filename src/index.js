'use strict'

var logger = require('./logger')
  , settings = require('./config')
  , modules = require('./modules')

logger.info(settings.GDAX)

modules.gdax.getAccounts()
    .then(function(accounts){
        logger.debug(accounts)
    })