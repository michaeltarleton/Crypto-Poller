var settings = require('../../config')
  , logger = require([settings.appRoot, '/logger'].join(''))
  , Gdax = require('gdax')
  , authenticatedClient = new Gdax.AuthenticatedClient(settings.gdax.api.key, settings.gdax.api.secret, settings.gdax.api.passphrase, settings.gdax.api.url)
  , btcPublicClient = new Gdax.PublicClient('BTC-USD', settings.gdax.api.url)
  , ethPublicClient = new Gdax.PublicClient('ETH-USD', settings.gdax.api.url)
  , ltcPublicClient = new Gdax.PublicClient('LTC-USD', settings.gdax.api.url)

var logError = function(err){
    logger.error(err)
    throw err
}

var getAccounts = function(){
    return authenticatedClient.getAccounts()
        .then(function(accounts){
            logger.debug(accounts, 'Accounts')
            return accounts
        })
        .catch(function(err){
            logger.error(err)
            throw err
        })
}

var getBTCUSDTicker = function(){
    return btcPublicClient.getProductTicker()
        .then(function(ticker){
            logger.debug(ticker, 'BTC-USD Ticker')
            return ticker
        })
        .catch(logError)
}

var getETHUSDTicker = function(){
    return ethPublicClient.getProductTicker()
        .then(function(ticker){
            logger.debug(ticker, 'ETH-USD Ticker')
            return ticker
        })
        .catch(logError)
}

var getLTCUSDTicker = function(){
    return ltcPublicClient.getProductTicker()
        .then(function(ticker){
            logger.debug(ticker, 'LTC-USD Ticker')
            return ticker
        })
        .catch(logError)
}

module.exports = {
    getAccounts: getAccounts,
    getBTCUSDTicker: getBTCUSDTicker,
    getETHUSDTicker: getETHUSDTicker,
    getLTCUSDTicker: getLTCUSDTicker
}