const express = require('express');
const path = require('path');
const fs = require('fs');
const request = require('request');

var app = express();
var staticRoot = __dirname + '/';

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// PORT
var port = 4200;
if (process.argv.length >= 3 && !isNaN(parseInt(process.argv[2]))) {
  port = parseInt(process.argv[2]);
}

app.set('port', port);
app.use(express.static(staticRoot));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// BASE URL
var baseUrl = 'http://localhost:5000';
if (process.argv.length >= 4) {
  baseUrl = process.argv[3]
}

var router = express.Router();

// GET
router.get('/*', function (req, res) {

  var requestOptions = {
    'method': req.method,
    'headers': req.headers,
    'url': baseUrl + req.url
  };

  function requestCallback(err, response, body) {

    if(response && response.statusCode) {
      console.log('GET ' + requestOptions.url + ' ' + (response.statusCode || ''));
    }

    if (err) {
      if (response && response.statusCode) {
        res.status(response.statusCode);
      } else {
        res.status(500);
      }
    } else {
      res.status(response.statusCode).json(JSON.parse(body));
    }
  }
  request(requestOptions, requestCallback);
});

// POST
router.post('/*', function (req, res) {

  var requestOptions = {
    'method': req.method,
    'headers': req.headers,
    'body': req.body,
    'url': baseUrl + req.url,
    'json': true
  };

  function requestCallback(err, response, body) {

    if(response && response.statusCode) {
      console.log('POST ' + requestOptions.url + ' ' + (response.statusCode || ''));
    }

    if (err) {
      if (response && response.statusCode) {
        res.status(response.statusCode);
      } else {
        res.status(500);
      }
    } else {
      res.status(response.statusCode).json(body);
    }
  }
  request(requestOptions, requestCallback);
});

// PUT
router.put('/*', function (req, res) {

  var requestOptions = {
    'method': req.method,
    'headers': req.headers,
    'body': req.body,
    'url': baseUrl + req.url,
    'json': true
  };

  function requestCallback(err, response, body) {

    if(response && response.statusCode) {
      console.log('PUT ' + requestOptions.url + ' ' + (response.statusCode || ''));
    }

    if (err) {
      if (response && response.statusCode) {
        res.status(response.statusCode);
      } else {
        res.status(500);
      }
    } else {
      res.status(response.statusCode).json(JSON.parse(body));
    }
  }
  request(requestOptions, requestCallback);
});

app.use('', router);

app.listen(app.get('port'), function () {
  console.log('server listening on port ' + app.get('port'));
});
