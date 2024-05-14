var express = require('express');
var router = express.Router();
var polnilnicaUsageTrackerController = require('../../controllers/tracking/polnilnicaUsageTrackerController.js');

/*
 * GET
 */
router.get('/', polnilnicaUsageTrackerController.list);

/*
 * GET
 */
router.get('/:id', polnilnicaUsageTrackerController.show);

/*
 * POST
 */
router.post('/', polnilnicaUsageTrackerController.create);

/*
 * PUT
 */
router.put('/:id', polnilnicaUsageTrackerController.update);

/*
 * DELETE
 */
router.delete('/:id', polnilnicaUsageTrackerController.remove);

module.exports = router;
