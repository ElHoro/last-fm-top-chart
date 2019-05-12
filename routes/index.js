'use strict'

const express = require('express');
const api = express.Router();
const trackCtrl = require('../controllers/track');

api.get('/tracks', trackCtrl.getTracks);
api.get('/artist/:mbid', trackCtrl.getArtist);

module.exports = api;
