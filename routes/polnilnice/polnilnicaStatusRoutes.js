var express = require('express');
var router = express.Router();
var polnilnicaStatusController = require('../../controllers/polnilnice/polnilnicaStatusController.js');

/*
 * GET
 */
router.get('/', polnilnicaStatusController.list);

/*
 * GET
 */
router.get('/:id', polnilnicaStatusController.show);

/*
 * POST
 */
router.post('/', polnilnicaStatusController.create);

/*
 * PUT
 */
router.put('/:id', polnilnicaStatusController.update);

/*
 * DELETE
 */
router.delete('/:id', polnilnicaStatusController.remove);

module.exports = router;
