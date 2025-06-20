'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};
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
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        // Create private key, public key
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
        });
        console.log({ privateKey, publicKey }); // Save to collection keystore
        const publicKeyString = await KeyTokenService.createKeyToken({
          userID: newShop._id,
          publickey,
        });
        if (!publicKeyString) {
          return {
            code: 'xxxx',
            message: 'publicKeyString error',
          };
        }

        // Create token pair
        const tokens = await createTokenPair(
          { userID: newShop._id, email },
          publicKey,
          privateKey
        );
        console.log(`Create token success::`, tokens);
        return {
          code: '201',
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      }
      return {
        code: '200',
        metadata: null,
      };
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
