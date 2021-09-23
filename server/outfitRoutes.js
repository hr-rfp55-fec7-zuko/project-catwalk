var express = require('express');
var axios = require('axios');
var { TOKEN } = require('../client/config.js');

var router = express.Router();

var outfits = {};
var fixUserID = 'demo';

//POST to cardfit
router.post('/', (req, res) => {
  var userId = fixUserID;
  var data = req.body;
  let outfitArr = [];

  if (!(userId in outfits)) {
    outfits[userId] = [data];
  } else {
    outfitArr = outfits[userId];
    outfitArr.unshift(data);
  }

  res.status(201).send(data);
});

router.get('/', (req, res) => {
  var userId = fixUserID;
  if (!(userId in outfits)) {
    res.json([]);
  } else {
    res.json(outfits[userId]);
  }
});


router.delete('/:productId', (req, res) => {
  var userId = fixUserID;
  var deleteId = req.params['productId'];

  if ((userId in outfits)) {

    let outfit = outfits[userId];
    var index = 0;


    outfit.forEach((item, i) => {
      if (item.data.info.id === parseInt(deleteId)) {
        index = i;
      }
    });
    outfit.splice(index, 1);
  }
  res.json(outfits[userId]);
});

module.exports = router;