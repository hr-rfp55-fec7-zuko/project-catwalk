const express = require('express');
const router = express.Router();
const axios = require('axios');
const token = require('../client/config.js');
const Promise = require('bluebird');


var AtelierAPI = (method, endpoint, params = null, data = null, cb) => {
  axios({
    method: method,
    url: endpoint,
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/',
    timeout: 1000,
    params: params,
    data: data,
    headers: { Authorization: token.TOKEN},
  })
    .then(response => {
      cb(null, response);
    })
    .catch(error => {
      cb(error, null);
    });
};

var AtelierAPIAsync = Promise.promisify(AtelierAPI);

//TO DO DURING INTEGRATION: DYNAMICALLY UPDATE PARAMS (TO BE DELETED AFTER INTEGRATION)

router.get('/questions', (req, res) => {
  AtelierAPI('GET', '/qa/questions', {'product_id': '40344', 'page': 1, 'count': 5}, null, (err, response) => {
    if (err) {
      res.send(err).status(500);
    } else {
      // console.log('🥰', response.data.results);
      res.send(response.data.results).status(200);
    }
  });
});

module.exports = router;