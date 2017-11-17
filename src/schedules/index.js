var settings = require('../config')
  , logger = require([settings.appRoot,'/logger'].join(''))
  , cron = require('node-cron')
  , modules = require('../modules')
  , emailer = require('../email')
  , Promise = require('bluebird')
  , moment = require('moment')

function getGDAXTicker(){
    var subject = 'GDAX Ticker Update'
    Promise.all([
        modules.gdax.getBTCUSDTicker(),
        modules.gdax.getETHUSDTicker(),
        modules.gdax.getLTCUSDTicker()
    ])
    .spread(function(btc, eth, ltc){

        var msg = []

        msg = [
            '\nBTC: ',
            '$',btc.bid,
            ' / $',btc.ask,
            '\nETH: ',
            '$',eth.bid,
            ' / $',eth.ask,
            '\nLTC: ',
            '$',ltc.bid,
            ' / $',ltc.ask,
            '\ntime: ',moment(ltc.time).format('HH:mm:ss')
        ].join('')

        emailer.sendBasicEmail(subject, msg)
            .then(function(response){
                logger.info('successfully sent the email for ' + subject)
            })
            .catch(function(err){
                logger.error('failed to send the email for ' + subject)
            })
    })
    .catch(function(err){
        logger.debug(err)
        emailer.sendBasicEmail(subject, 'failed to send ticker updates')
            .then(function(response){
                logger.info('successfully sent the error email for ' + subject)
            })
            .catch(function(err){
                logger.error('failed to send the error email for ' + subject)
            })
    })
}

module.exports = function(){
    cron.schedule('0 */15 * * * *', getGDAXTicker)
}