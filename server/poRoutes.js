var express = require('express');
var axios = require('axios');
var { TOKEN } = require('../client/config.js');

var router = express.Router();

//NOT TESTED

//Axios with Options config

let getProductInfo = (productId, styles = false) => {
  let options = {
    method: 'get',
    baseURL: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': TOKEN
    }
  };

  if (styles) {
    options.url = '/styles';
  }

  return axios(options); //run callback or reurn axios to promise chain somewhere else?
};

// GET product information
router.get('/:id', (req, res) => {
  getProductInfo(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error('error from poRoutes get id', error);
      res.sendStatus(404);
    });
});

// GET product style information
router.get('/:id/styles', (req, res) => {
  getProductInfo(req.params.id, true)
    .then((data) => {
      res.send(data.results);
    })
    .catch((error) => {
      console.error('error from poRoutes get id/styles', error);
      res.sendStatus(404);
    });
});

module.exports = router;