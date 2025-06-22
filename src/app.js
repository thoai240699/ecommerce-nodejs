require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// Initialize middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
// Initialize database connection
require('./dbs/init.mongodb');

//Check overload
// const {checkOverload} = require('./helpers/check.connect')
// checkOverload();

// Define routes
app.use('/',require('./routes'));

// Error handling
app.use((req, res, next) =>{
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    const statusCode = error.status || 500 // error server code
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal server error'
    })
}
)

// Export app for use in server.js
module.exports = app;
