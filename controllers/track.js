'use strict'
const config = require('../config');
const request = require('request-promise');
const api_key = config.API_KEY;
const api_url = config.API_ROOT;

function getTracks(req, res){
  request({
    "method":"GET",
    "uri": `${api_url}?method=chart.gettoptracks&api_key=${api_key}&format=json`,
    "json": true,
  }).then( (response) => {
    res.status(200).send({response});
  }).catch( (err) => {
    res.status(404).send(err);
  });
}

function getArtist(req, res){
  const mbid = req.params.mbid;

  const topTracks = request({
    "method":"GET",
    "uri": `${api_url}?method=artist.gettoptracks&mbid=${mbid}&api_key=${api_key}&format=json`,
    "json": true,
  }).then( (response) => {
    return response;
  }).catch( (err) => {
    return err;
  });

  const artist = request({
    "method":"GET",
    "uri": `${api_url}?method=artist.getinfo&mbid=${mbid}&api_key=${api_key}&format=json`,
    "json": true,
  }).then( (response) => {
    return response;
  }).catch( (err) => {
    return err;
  });

  Promise.all([artist, topTracks])
    .then( (response) => {
      res.status(200).send(response);
    })
    .catch( (err) => {
      res.status(404).send(err);
    });

}

module.exports = {
  getTracks,
  getArtist,
}
