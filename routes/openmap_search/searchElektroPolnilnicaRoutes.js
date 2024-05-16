var express = require('express');
var router = express.Router();
var elektroPolnilnicaController = require('../../controllers/openmap_search/searchElektroPolnilnicaController.js');

/**
 * GET
 */
router.get('/test', elektroPolnilnicaController.testOpenCharge);
router.get('/save', elektroPolnilnicaController.saveOpenChargeData);

/**
 * POST
 */


module.exports = router;
