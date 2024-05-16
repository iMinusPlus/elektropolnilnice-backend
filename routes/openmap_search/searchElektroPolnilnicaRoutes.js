var express = require('express');
var router = express.Router();
var elektroPolnilnicaController = require('../../controllers/openmap_search/searchElektroPolnilnicaController.js');

router.get('/test', elektroPolnilnicaController.testOpenCharge);

module.exports = router;
