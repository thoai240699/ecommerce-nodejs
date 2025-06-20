"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // Validate required fields
      if (!name || !email || !password) {
        return {
          code: "400",
          message: "Missing required fields: name, email, password",
        };
      }

      // step 1: Check email exists
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xxxx",
          message: "Shop already registered",
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
        // For big project
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });
        //pkcs1: Public-Key Cryptography Standards #1
        // For basic
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        
        console.log({ privateKey, publicKey });
        // Save to collection keystore
        const keyStore = await KeyTokenService.createKeyToken({
          userID: newShop._id,
          privateKey,
          publicKey
        });
        if (!keyStore) {
          return {
            code: "xxxx",
            message: "publicKeyString error",
          };
        }
        // // Convert publicKey from database
        // const publicKeyObject = crypto.createPublicKey(publicKeyString);
        // Create token pair
        const tokens = await createTokenPair(
          { userID: newShop._id, email },
          publicKey,
          privateKey
        );
        console.log(`Create token success::`, tokens);
        return {
          code: "201",
          metadata: {
            shop: getInfoData({fields: ['_id','name','email'], object:  newShop}),
            tokens
          },
        };
      }
      return {
        code: "200",
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
