'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const app = express();
const api = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use('/api', api);
app.get('/artist/:mbid', (req, res) => {
  let mbid = req.params.mbid;

  res.render('artist', {mbid: mbid});
});
app.get('/', (req, res) => {
  res.render('tracks');
});

module.exports = app;
