const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://app:foo@ds031347.mlab.com:31347/cit-gened-finder', (err, database) => {
  if (err) return console.error(err);
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})

// bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/')
