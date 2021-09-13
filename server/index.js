const express = require('express');

const reviews = require('./rrRoutes.js');
const productInfo = require('./poRoutes.js');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/reviews', reviews);
app.use('/product', productInfo);

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});



