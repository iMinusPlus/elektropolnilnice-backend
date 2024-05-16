var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express [i-+ ElektroPolnilnice]' });
});

router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' })
});

module.exports = router;
