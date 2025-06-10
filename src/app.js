// Import required libraries
// express: Most popular web framework for Node.js
// morgan: HTTP request logger middleware
// helmet: Security middleware
// compression: Response compression middleware
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
// helmet(): Protect application by setting secure HTTP headers
// Prevents common attacks like XSS, clickjacking
app.use(helmet());

// compression(): Compress response to reduce data transfer size
// Improves page load speed
app.use(compression()); 

// Initialize database connection


// Define routes
// Default route returns "welcome" message
// req: Request object containing client information
// res: Response object to send response to client
// next: Function to pass control to next middleware
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "welcome",
  });
});

// Error handling


// Export app for use in server.js
module.exports = app;
