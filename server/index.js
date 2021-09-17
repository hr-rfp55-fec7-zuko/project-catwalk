const express = require('express');

const reviews = require('./rrRoutes.js');
const products = require('./productRoutes.js');
const cart = require('./cartRoutes.js');
const qa = require('./qaRoutes.js');
const outfit = require('./outfitRoutes.js');

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

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});



