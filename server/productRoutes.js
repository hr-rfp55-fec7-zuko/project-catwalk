var express = require('express');
var axios = require('axios');
var { TOKEN } = require('../client/config.js');

var router = express.Router();

//NOT TESTED

//Axios with Options config

let getProductInfo = (productId, flag = null) => {
  let options = {
    method: 'get',
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
    headers: {
      'User-Agent': 'request',
      'Authorization': TOKEN
    }
  };

  if (flag === 'styles') {
    options.url = `/${productId}/styles`;
  } else if (flag === 'related') {
    options.url = `/${productId}/related`;
  } else {
    options.url = `/${productId}`;
  }

  return axios(options);
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
  getProductInfo(req.params.id, 'styles')
    .then((data) => {
      res.send(data.results);
    })
    .catch((error) => {
      console.error('error from poRoutes get id/styles', error);
      res.sendStatus(404);
    });
});

// GET related product information
router.get('/:id/related', (req, res) => {
  getProductInfo(req.params.id, 'related')
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error('error from poRoutes get id/related', error);
      res.sendStatus(404);
    });
});
module.exports = router;