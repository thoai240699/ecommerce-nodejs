'use strict';

const { Schema, model } = require('mongoose'); // Erase if already required
const { schema } = require('./shop.model');

const DOCUMENT_NAME = 'Key';
const COLLECTIONS_NAME = 'Keys';
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shop',
  },
  publicKey: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: Array,
    default: [],
  }
}, {
    collection: COLLECTIONS_NAME,
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);
