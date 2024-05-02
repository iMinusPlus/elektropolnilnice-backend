var express = require('express');
var router = express.Router();
var elektroPolnilnicaController = require('../controllers/elektroPolnilnicaController.js');

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

/*
 * PUT
 */
router.put('/:id', elektroPolnilnicaController.update);

/*
 * DELETE
 */
router.delete('/:id', elektroPolnilnicaController.remove);

module.exports = router;
