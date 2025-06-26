'use strict'

const { CREATED } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
  signUp = async (req, res, next) => {
    
    // Sign up
    new CREATED({
      message: 'registered success',
      metadata: await AccessService.signUp(req.body),
      options: {
         limit: 10
      }
    }).send(res)

  }
}

module.exports = new AccessController()
