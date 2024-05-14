var express = require('express');
var router = express.Router();
var connectionController = require('../../controllers/polnilnice/connectionController.js');

/*
 * GET
 */
router.get('/', connectionController.list);

/*
 * GET
 */
router.get('/:id', connectionController.show);

/*
 * POST
 */
router.post('/', connectionController.create);

/*
 * PUT
 */
router.put('/:id', connectionController.update);

/*
 * DELETE
 */
router.delete('/:id', connectionController.remove);

module.exports = router;
