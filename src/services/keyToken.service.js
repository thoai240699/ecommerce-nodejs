'use strict';

const keytokenModel = require('../models/keytoken.model');

class KeyTokenService {
  static createKeyToken = async ({ userID, privateKey,publicKey}) => {
    try {
      // const publicKeyString = publicKey.toString();
      // const tokens = await keytokenModel.create({
      //   user: userID,
      //   publicKey: publicKeyString,
      // });
      const tokens = await keytokenModel.create({
        user: userID,
        privateKey,
        publicKey,
      });
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}
module.exports = KeyTokenService;
