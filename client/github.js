const request = require('request');
const config = require('../config.js');

let getData= (callback) => {
  let options = {
    url: ` https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/`,
    headers: {
      //'User-Agent': 'request',
      Authorization: `token ${config.TOKEN}`
    }
  };
  request.get(options, (err, response, body) => {
    if (err) callback(err);
    else {
      callback(null, JSON.parse(body));
    }
  });

  module.exports.getData = getData;