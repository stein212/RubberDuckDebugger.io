'use strict';

const express = require('express');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

var port = process.env.PORT || 3000

app.use(express.static(__dirname + '/static'));


// Initializing the server when server.js is being executed
http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;
