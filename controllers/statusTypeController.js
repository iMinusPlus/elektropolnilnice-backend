var StatustypeModel = require('../models/statusTypeModel.js');

/**
 * statusTypeController.js
 *
 * @description :: Server-side logic for managing statusTypes.
 */
module.exports = {

    /**
     * statusTypeController.list()
     */
    list: function (req, res) {
        StatustypeModel.find(function (err, statusTypes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting statusType.',
                    error: err
                });
            }

            return res.json(statusTypes);
        });
    },

    /**
     * statusTypeController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        StatustypeModel.findOne({_id: id}, function (err, statusType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting statusType.',
                    error: err
                });
            }

            if (!statusType) {
                return res.status(404).json({
                    message: 'No such statusType'
                });
            }

            return res.json(statusType);
        });
    },

    /**
     * statusTypeController.create()
     */
    create: function (req, res) {
        var statusType = new StatustypeModel({
			id : req.body.id,
			operational : req.body.operational,
			userSelectable : req.body.userSelectable,
			title : req.body.title
        });

        statusType.save(function (err, statusType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating statusType',
                    error: err
                });
            }

            return res.status(201).json(statusType);
        });
    },

    /**
     * statusTypeController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        StatustypeModel.findOne({_id: id}, function (err, statusType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting statusType',
                    error: err
                });
            }

            if (!statusType) {
                return res.status(404).json({
                    message: 'No such statusType'
                });
            }

            statusType.id = req.body.id ? req.body.id : statusType.id;
			statusType.operational = req.body.operational ? req.body.operational : statusType.operational;
			statusType.userSelectable = req.body.userSelectable ? req.body.userSelectable : statusType.userSelectable;
			statusType.title = req.body.title ? req.body.title : statusType.title;
			
            statusType.save(function (err, statusType) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating statusType.',
                        error: err
                    });
                }

                return res.json(statusType);
            });
        });
    },

    /**
     * statusTypeController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        StatustypeModel.findByIdAndRemove(id, function (err, statusType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the statusType.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
