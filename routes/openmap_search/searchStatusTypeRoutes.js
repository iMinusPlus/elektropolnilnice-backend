var express = require('express');
var router = express.Router();
var statusTypeController = require('../../controllers/openmap_search/searchStatusTypeController.js');

/*
 * GET
 */
router.get('/', statusTypeController.list);

/*
 * GET
 */
router.get('/:id', statusTypeController.show);

/*
 * POST
 */
router.post('/', statusTypeController.create);

/*
 * PUT
 */
router.put('/:id', statusTypeController.update);

/*
 * DELETE
 */
router.delete('/:id', statusTypeController.remove);

module.exports = router;
