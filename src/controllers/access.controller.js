'use strict';

const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      /**Code 200: Ok
       * Code 201: Created
       */
      console.log(`[P]::signUp::`, req.body);
      // Add validation to prevent destructuring error
      if (!req.body) {
        return res.status(400).json({
          code: '400',
          message: 'Request body is required'
        });
      }
      return res.status(201).json(await AccessService.signUp(req.body));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
