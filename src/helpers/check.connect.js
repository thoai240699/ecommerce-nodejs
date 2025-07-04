'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;
// count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connection::${numConnection}`);
  return numConnection;
};
// check over load 
const checkOverload = () =>{
    setInterval(()=>{
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnections = numCores*5;//example max connect base on cores

        console.log(`Active connections: ${numConnection}`)
        console.log(`Memory usage: ${memoryUsage/1024/1024} MB`)
        if(numConnection > maxConnections){
            console.log(`Connections overload detected`)
        }

    },_SECONDS) // Monitor every 5 seconds
}

module.exports = {
  countConnect,
  checkOverload
};
