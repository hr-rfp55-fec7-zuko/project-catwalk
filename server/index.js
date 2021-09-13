const express = require('express');

const reviews = require('./rrRoutes.js');
const products = require('./productRoutes.js');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/reviews', reviews);
app.use('/products', productInfo);

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});



