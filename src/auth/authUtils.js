'use strict';
const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // AccessToken
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days',
    });
    // RefreshToken
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7 days',
    });
    // Verify token
    JWT.verify(accessToken,publicKey, (err, decode)=>{
        if(err){
            console.log(`error verify::`, err)
        }else{
            console.log(`decode verify::`, decode)
        }
    })
    return {accessToken, refreshToken}
  } catch (error) {
        console.log(`createTokenPair error::`, error)
  }
};

module.exports = {
  createTokenPair,
};
