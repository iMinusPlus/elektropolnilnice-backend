var express = require('express');
var router = express.Router();
var elektroPolnilnicaController = require('../../controllers/openmap_search/searchElektroPolnilnicaController.js');

/*
 * GET
 */
router.get('/test', elektroPolnilnicaController.testOpenCharge);
router.get('/', elektroPolnilnicaController.list);
/*
 * GET
 */
router.get('/:id', elektroPolnilnicaController.show);

/*
 * POST
 */
router.post('/', elektroPolnilnicaController.create);

/*
 * PUT
 */
router.put('/:id', elektroPolnilnicaController.update);

/*
 * DELETE
 */
router.delete('/:id', elektroPolnilnicaController.remove);

module.exports = router;
