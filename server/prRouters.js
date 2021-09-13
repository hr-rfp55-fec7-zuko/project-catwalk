var express = require('express');
var axios = require('axios');
var config = require('../client/config.js');

var router = express.Router();

/* API Query Helper */
const handleQStrings = (input, flag = '') => {
  if (input === undefined) {
    return '';
  }
  if (flag) {
    return `${flag}=${input}`;
  }
  return `/${input}`;
};

const APIQuery = (q, callback) => {
  const query = {};
  query.product_id = handleQStrings(q.product_id);
  query.flag = handleQStrings(q.flag);
  console.log(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products${query.product_id + query.flag}`);
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products${query.product_id + query.flag}`, {
    headers: {
      'Authorization': `${config.TOKEN}`,
      'User-Agent': 'request'
    },
  })
    .then((results) => {
      callback(null, results.data);
    })
    .catch((err) => {
      callback(err, null);
    });
};


router.get('/', (req, res) => {
  console.log(req.query);
  APIQuery(req.query, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Export
module.exports = router;

