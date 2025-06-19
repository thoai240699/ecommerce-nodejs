'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: Check email exists
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already registered',
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password,
        roles,
      });
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      };
    }
  };
}

module.exports = AccessService;
