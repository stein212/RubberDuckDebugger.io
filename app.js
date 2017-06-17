'use strict';

const express = require('express');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formidable = require("formidable");
const util = require("util");

const app = express();

var port = process.env.PORT || 3000

app.use(express.static(__dirname + '/Frontend_static_webpage'));

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
  // Format the request json
app.use(bodyParser.urlencoded({ extended: true }));

const pair = require("./Queue/pair.js").class;

  app.post("/AddToQueue", function (req, res) {
    console.log(req.body);
    var intent = req.body.intent;
    var id = req.body.id;
    // var form = new formidable.IncomingForm();
    // Iteration between the fields that is sent to the backend will be done
    // in the premise in the function.
    // form.on('field', function (field, value) {

    console.log(intent);
    if (pair[intent].queue.indexOf(id) == -1) {
      pair[intent].AddToQueue(id);
    }

    // res.writeHead(200, {
    //     'content-type': 'application/json'
    // });
    res.send(pair.GetAPair(intent, id));
    // res.end(util.inspect({
    //     fields: pair.GetAPair(intent, id)
    // }));
  });

  app.get("/GetQueueSize", function (req, res) {
    var intent = req.query.queue;
    var JSONResult = {};
    var isEmpty = pair[intent].queueStatus();
    JSONResult['queue_name'] = intent;
    JSONResult[intent + '_queue'] = pair[intent].queue;
    JSONResult['isQueueEmpty'] = isEmpty;
    JSONResult['count'] = pair[intent].queue.length;
    res.send(JSONResult);
  });
}

module.exports = app;
