var express = require('express');
var router = express.Router();
var elektroPolnilnicaController = require('../../controllers/polnilnice/elektroPolnilnicaController.js');

/*
 * GET
 */
router.get('/', elektroPolnilnicaController.list);

/*
 * GET
 */
router.get('/:id', elektroPolnilnicaController.show);

/*
 * POST
 */
router.post('/', elektroPolnilnicaController.create);
router.post('/app', elektroPolnilnicaController.app);

/*
 * PUT
 */
router.put('/:id', elektroPolnilnicaController.update);

/*
 * DELETE
 */
router.delete('/:id', elektroPolnilnicaController.remove);

module.exports = router;
