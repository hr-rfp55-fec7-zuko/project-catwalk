const express = require('express');
const router = express.Router();
const axios = require('axios');
const token = require('../client/config.js');


var AtelierAPI = (method, endpoint, params = null, data = null) => {
  return (axios({
    method: method,
    url: endpoint,
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/',
    timeout: 1000,
    params: params,
    data: data,
    headers: { Authorization: token.TOKEN},
  }));
};

//TO DO DURING INTEGRATION: DYNAMICALLY UPDATE PARAMS (TO BE DELETED AFTER INTEGRATION)

router.get('/questions', (req, res) => {
  AtelierAPI('GET', '/qa/questions', {'product_id': '40344', 'page': 1, 'count': 5})
    .then(response => {
      var final = response.data.results.sort((a, b) => (b.question_helpfulness - a.question_helpfulness));
      res.send(final).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

module.exports = router;