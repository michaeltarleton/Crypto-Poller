var settings = require('../config')
  , logger = require([settings.appRoot,'/logger'].join(''))
  , cron = require('node-cron')
  , modules = require('../modules')
  , emailer = require('../email')

function getBTCUSDTicker(){
    var subject = 'BTC-USD Ticker Update'
    modules.gdax.getBTCUSDTicker()
        .then(function(ticker){
            var msg = [
                '\nbid: $',ticker.bid,
                '\nask: $',ticker.ask,
                '\ntime: ',ticker.time
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
    cron.schedule('* */15 * * * *', getBTCUSDTicker)
}