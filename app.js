'use strict';

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

var port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/static')));
// app.use(express.errorHandler());


// Initializing the server when server.js is being executed
http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);
});
