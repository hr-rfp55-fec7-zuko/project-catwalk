const express = require('express');

const reviews = require('./rrRoutes.js');
const products = require('./productRoutes.js');
const cart = require('./cartRoutes.js');
const qa = require('./qaRoutes.js');
const outfit = require('./outfitRoutes.js');
const token = require('../client/config.js');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/reviews', reviews);
app.use('/products', products);
app.use('/cart', cart);
app.use('/qa', qa);
app.use('/outfit', outfit);

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

app.post('/interactions', (req, res) => {
  AtelierAPI('POST', '/interactions', null, req.body.params)
    .then(response => {
      res.sendStatus(response.status);
      console.log('server success', response);
    })
    .catch(err => {
      res.send(err).status(500);
      console.log('server err', err);
    });
});

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});



