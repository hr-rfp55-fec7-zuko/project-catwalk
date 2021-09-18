var express = require('express');
var axios = require('axios');
var { TOKEN } = require('../client/config.js');

var router = express.Router();

let cartRequest = (method, data = null) => {
  let options = {
    method: method,
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
    headers: {
      'User-Agent': 'request',
      'Authorization': TOKEN
    }
  };

  if (data) {
    options.data = data;
  }

  return axios(options);
};

// GET cart
router.get('/', (req, res) => {
  cartRequest('get')
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error('error from cart get', error);
      res.sendStatus(404);
    });
});

//POST to cart
router.post('/', (req, res) => {
  cartRequest('post', req.body)
    .then(() => {
      res.end();
    })
    .catch((error) => {
      console.error('error from cart post', error);
      res.sendStatus(404);
    });
});

module.exports = router;