// Import required libraries
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// Initialize middleware
// morgan('dev'): Log requests with concise format, suitable for development
// Other morgan formats:
// - combined: Full format, suitable for production
// - common: Standard format
// - short: Short format
// - tiny: Minimal format
app.use(morgan("dev"));
// Set up security and optimization middleware
// setting secure HTTP headers. Prevents common attacks like XSS
app.use(helmet());

// Compress response to reduce data transfer size. Improves page load speed
app.use(compression()); 

// Initialize database connection
require('./dbs/init.mongodb')

//Check overload
const {checkOverload} = require('./helpers/check.connect')
checkOverload();


// Define routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "welcome",
  });
});

// Error handling


// Export app for use in server.js
module.exports = app;
