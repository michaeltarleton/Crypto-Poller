var settings = require('../config')
  , logger = require([settings.appRoot,'/logger'].join(''))
  , mailer = require('nodemailer')
  , transport = mailer.createTransport({
      host: settings.email.smtp.host,
      port: settings.email.smtp.port,
      secure: true,
      auth: {
          type: 'OAuth2',
          clientId: settings.email.smtp.clientId,
          clientSecret: settings.email.smtp.clientSecret
      }
  })
  , options = {
      from: settings.email.smtp.from,
      to: settings.email.smtp.to,
      auth: {
          user: settings.email.smtp.username,
          refreshToken: settings.email.smtp.refreshToken,
      }
  }

var test = function() {
    var mail = {
        subject: 'Sample Subject',
        html: '<b>Sample HTML</b>',
        text: 'Sample TEXT'
    }

    return send(mail)
}

var send = function(mail){
    Object.assign(mail, options)

    return transport.sendMail(mail)
        .then(function(response){
            logger.debug(response, 'response')
        })
        .catch(function(err){
            logger.error(err)
            throw err
        })
}

var sendBasicEmail = function(subject, msg) {
    return send({
        subject: subject,
        text: msg
    })
}

module.exports = {
    test: test,
    sendBasicEmail: sendBasicEmail
}
