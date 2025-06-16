'use strict';

const mongoose = require('mongoose');
const connectString = `mongodb://localhost:27017/shopDEV`;
const {countConnect} = require('../helpers/check.connect');

class Database {
  constructor() {
    this.connect();
  }
  // Connect
  connect(type = 'mongodb') {
    // dev
    if (1 === 1) {
      mongoose.set('debug',true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectString,{
        maxPoolSize: 50 // Limit 50 connections
      })
      .then(() => console.log(`connected mongodb success`,countConnect()))
      .catch((err) => console.log(`Error connect!`));
  }
  // init
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
