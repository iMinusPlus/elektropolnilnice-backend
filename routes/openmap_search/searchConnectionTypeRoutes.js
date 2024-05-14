var express = require('express');
var router = express.Router();
var connectionTypeController = require('../../controllers/openmap_search/searchConnectionTypeController.js');

/*
 * GET
 */
router.get('/', connectionTypeController.list);

/*
 * GET
 */
router.get('/:id', connectionTypeController.show);

/*
 * POST
 */
router.post('/', connectionTypeController.create);

/*
 * PUT
 */
router.put('/:id', connectionTypeController.update);

/*
 * DELETE
 */
router.delete('/:id', connectionTypeController.remove);

module.exports = router;
