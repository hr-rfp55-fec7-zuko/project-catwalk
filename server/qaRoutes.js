const express = require('express');
const router = express.Router();
const axios = require('axios');
const token = require('../client/config.js');


var AtelierAPI = (method, endpoint, params = null, data = null) => {
  return (axios({
    method: method,
    url: endpoint,
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/',
    params: params,
    data: data,
    headers: { Authorization: token.TOKEN},
  }));
};


router.get('/questions', (req, res) => {
  AtelierAPI('GET', '/qa/questions', req.query)
    .then(response => {
      var finalQ = response.data.results.sort((a, b) => (b.question_helpfulness - a.question_helpfulness));
      res.send(finalQ).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

router.get('/questions/:question_id/answers', (req, res) => {
  AtelierAPI('GET', '/qa/questions/' + req.query.qId + '/answers', {page: 1, count: 100})
    .then(response => {
      var finalA = response.data.results.sort((a, b) => {
        if (a.answerer_name === 'Seller' && b.answerer_name === 'Seller') {
          return 0;
        } else if (a.answerer_name === 'Seller') {
          return -1;
        } else if (b.answerer_name === 'Seller') {
          return 1;
        } else {
          return b.helpfulness - a.helpfulness;
        }
      });
      res.send(finalA).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

router.put('/questions/:question_id/helpful', (req, res) => {
  AtelierAPI('PUT', '/qa/questions/' + req.body.params.qId + '/helpful')
    .then(response => {
      res.sendStatus(response.status);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

router.put('/answers/:answer_id/helpful', (req, res) => {
  AtelierAPI('PUT', '/qa/answers/' + req.body.params.aId + '/helpful')
    .then(response => {
      res.sendStatus(response.status);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

router.put('/questions/:question_id/report', (req, res) => {
  AtelierAPI('PUT', '/qa/questions/' + req.body.params.qId + '/report')
    .then(response => {
      res.sendStatus(response.status);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

router.put('/answers/:answer_id/report', (req, res) => {
  AtelierAPI('PUT', '/qa/answers/' + req.body.params.aId + '/report')
    .then(response => {
      res.sendStatus(response.status);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

router.post('/questions/:question_id/answers', (req, res) => {
  AtelierAPI('POST', '/qa/questions/' + req.body.params.qId + '/answers', null, req.body.params.inner)
    .then(response => {
      res.sendStatus(response.status);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

router.post('/questions', (req, res) => {
  AtelierAPI('POST', '/qa/questions/', null, req.body.params)
    .then(response => {
      res.sendStatus(response.status);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

module.exports = router;