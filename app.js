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

app.use(express.static(__dirname + '/static'));
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
    var fields = {};
    var intent;
    var form = new formidable.IncomingForm();
    // Iteration between the fields that is sent to the backend will be done
    // in the premise in the function.
    form.on('field', function (field, value) {
      console.log(field);
      switch (field) {
        case 'intent': {
          console.log(value);
          if(value === 'receive' || value === 'insist'){
            fields[field] = value;
            intent = value;
          }
          else return null;
          break;
        }
        case 'id': {
          pair[intent].AddToQueue(value);
          fields[field] = value;
          break;
        }
        default:
          console.log('Invalid operation. Check the field');
      }
    });

    form.on('end', function () {
      res.writeHead(200, {
          'content-type': 'text/plain'
      });
      res.write('received the data:\n\n');
      res.end(util.inspect({
          fields: fields
      }));
    });
    form.parse(req);
  });

  app.get("/GetQueueSize", function (req, res) {
    var intent = req.query.queue;
    console.log(intent);
    var isEmpty = pair[intent].queueStatus();
    res.send(JSON.stringify({queue_name: intent, isQueueEmpty: isEmpty, count: pair[intent].queue.length}));
  });
}

module.exports = app;
