var settings = require('../../config')
, logger = require([settings.appRoot, '/logger'].join(''))
, crypto = require('crypto')
, axios = require('axios')
, privateInstance = axios.create({
    baseURL: settings.gdax.api.url,
    headers: {
        'CONTENT-TYPE': 'application/json',
        'CB-ACCESS-KEY': settings.gdax.api.key,
        'CB-ACCESS-PASSPHRASE': settings.gdax.api.passphrase 
    }
})

var generateSignature = function(timestamp, method, url, body){
  // create the prehash string by concatenating required parts
  var what = timestamp + method + url

  if(body) what += JSON.stringify(body)

  // decode the base64 secret
  var key = Buffer(settings.gdax.api.secret, 'base64');

  // create a sha256 hmac with the secret
  var hmac = crypto.createHmac('sha256', key);

  // sign the require message with the hmac
  // and finally base64 encode the result
  return hmac.update(what).digest('base64');  
}

var getTimestamp = function(){
  return Date.now() / 1000
}

var getPrivateRoute = function(method, path, body){
    var timestamp = getTimestamp()
      , signature = generateSignature(timestamp, method, path, body) 
      , obj = {
            url: path,
            method: method,
            headers: {
                'CB-ACCESS-SIGN': signature,
                'CB-ACCESS-TIMESTAMP': '' + timestamp,
            }
        }

    if(body) obj.body = body

    logger.debug('Url', settings.gdax.api.url)
    logger.debug('Path', path)
    logger.debug('Method', method)
    logger.debug('Timestamp', timestamp)
    logger.debug('Signature', signature)

    return privateInstance.request(obj)
        .then(function(response){
            return response.data
        })
        .catch(function(err){
            logger.error(err.response.data)
        })
}

module.exports = {
  getPrivateRoute: getPrivateRoute
}