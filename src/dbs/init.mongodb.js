"use strict";

const mongoose = require("mongoose");
const {
  db: { host, name, port },
} = require("../configs/configs.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`;
console.log(`ConnectString: ${connectString}`);
const { countConnect } = require("../helpers/check.connect");
class Database {
  constructor() {
    this.connect();
  }
  // Connect
  connect(type = "mongodb") {
    // dev
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString, {
        maxPoolSize: 10, // Limit 50 connections
      })
      .then(() => console.log(`connected mongodb success`, countConnect()))
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
