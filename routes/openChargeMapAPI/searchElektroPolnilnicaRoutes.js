var express = require('express');
var router = express.Router();
var elektroPolnilnicaController = require('../../controllers/openChargeMapAPI/searchElektroPolnilnicaController.js');

/**
 * GET
 */
router.get('/test', elektroPolnilnicaController.testOpenCharge);
router.get('/fetch', elektroPolnilnicaController.fetchOpenChargeData);

/**
 * POST
 */


module.exports = router;
