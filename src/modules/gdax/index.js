var settings = require('../../config')
  , logger = require([settings.appRoot, '/logger'].join(''))
  , Gdax = require('gdax')
  , authenticatedClient = new Gdax.AuthenticatedClient(settings.gdax.api.key, settings.gdax.api.secret, settings.gdax.api.passphrase, settings.gdax.api.url)
  , btcPublicClient = new Gdax.PublicClient('BTC-USD', settings.gdax.api.url)
  , ethPublicClient = new Gdax.PublicClient('ETH-USD', settings.gdax.api.url)
  , ltcPublicClient = new Gdax.PublicClient('LTC-USD', settings.gdax.api.url)
  , ws = new Gdax.WebsocketClient(['BTC-USD','ETH-USD','LTC-USD'])

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

var processDoneOrder = function(message){
    logger.trace(message, 'web socket done order', message.reason, message.side, message.price)
} 
var processOpenOrder = function(message){
    logger.trace(message, 'web socket done order')
} 
var processReceivedOrder = function(message){
    logger.trace(message, 'web socket done order')
} 

var testWebSockets = function(){
    ws.on('open', function(data){
        logger.trace(data, 'opening web sockets')
    })
    ws.on('message', function(message){
        switch(message.type){
            case 'done': processDoneOrder(message)
            case 'open': processOpenOrder(message)
            case 'received': processReceivedOrder(message)
        }
    })
    ws.on('close', function(data){
        logger.trace(data, 'closing web socket')
    })
    ws.on('error', function(data){
        logger.error(data, 'web socket error')
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
    getLTCUSDTicker: getLTCUSDTicker,
    testWebSockets: testWebSockets
}