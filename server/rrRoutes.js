var express = require('express');
var axios = require('axios');
var config = require('../client/config.js');

var router = express.Router();

/* API Query Helper */
let APIQuery = function(method, endpath, query, data = null) {
  // console.log(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews${endpath}${query}`);
  return axios({
    method: method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews${endpath}${query}`,
    timeout: 3000,
    headers: {
      'Authorization': `${config.TOKEN}`,
      'User-Agent': 'request',
    },
    params: query,
    data: data
  })
    .then((results) => {
      results = results.data;
      /***********Remove 1 line below during cleanup!********/
      // console.log('Successful api request. Results', results);
      return results;
    })
    .catch((error) => {
      console.log('error', error);
      return error;
    });
};


/*** Routes ***/
router.get('/meta', (req, res) => {
  let endpath = '/meta';
  let query = `?product_id=${req.query.product_id}`;

  APIQuery('GET', endpath, query)
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(401).send(error));
});

router.get('/', (req, res) => {
  let endpath = '/';
  let query = `?product_id=${req.query.product_id}&count=${req.query.count}`;
  // console.log('query', query);

  APIQuery('GET', endpath, query)
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(401).send(error));
});

//Create new review
router.post('/', (req, res) => {
  let endpath = '/';
  let query = '';
  let data = req.body;

  APIQuery('POST', endpath, query, data)
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(401).send(error));
});

//Flag as helpful
router.put('/:review_id/helpful', (req, res) => {

  let endIdIndex = req.url.indexOf('/', 1);
  let reviewId = req.url.slice(1, endIdIndex);

  let endpath = `/${reviewId}/helpful`;
  let query = '';
  let body = '';

  APIQuery('PUT', endpath, query, body)
    .then((data) => {
      // console.log('put request data', data)
      res.status(205).send(data)})
    .catch((error) => res.status(401).send(error));


});

//Report review
router.put('/:review_id/report', (req, res) => {

  let endIdIndex = req.url.indexOf('/', 1);
  let reviewId = req.url.slice(1, endIdIndex);

  let endpath = `/${reviewId}/report`;
  let query = '';
  let body = '';

  APIQuery('PUT', endpath, query, body)
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(401).send(error));
});


//Export
module.exports = router;


