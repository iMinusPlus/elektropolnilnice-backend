var PolnilnicastatusModel = require('../models/polnilnicaStatusModel.js');

/**
 * polnilnicaStatusController.js
 *
 * @description :: Server-side logic for managing polnilnicaStatuss.
 */
module.exports = {

    /**
     * polnilnicaStatusController.list()
     */
    list: function (req, res) {
        PolnilnicastatusModel.find(function (err, polnilnicaStatuss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting polnilnicaStatus.',
                    error: err
                });
            }

            return res.json(polnilnicaStatuss);
        });
    },

    /**
     * polnilnicaStatusController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PolnilnicastatusModel.findOne({_id: id}, function (err, polnilnicaStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting polnilnicaStatus.',
                    error: err
                });
            }

            if (!polnilnicaStatus) {
                return res.status(404).json({
                    message: 'No such polnilnicaStatus'
                });
            }

            return res.json(polnilnicaStatus);
        });
    },

    /**
     * polnilnicaStatusController.create()
     */
    create: function (req, res) {
        var polnilnicaStatus = new PolnilnicastatusModel({
			id : req.body.id,
			operational : req.body.operational,
			userSelectable : req.body.userSelectable,
			currentlyOccupied : req.body.currentlyOccupied,
			title : req.body.title
        });

        polnilnicaStatus.save(function (err, polnilnicaStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating polnilnicaStatus',
                    error: err
                });
            }

            return res.status(201).json(polnilnicaStatus);
        });
    },

    /**
     * polnilnicaStatusController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PolnilnicastatusModel.findOne({_id: id}, function (err, polnilnicaStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting polnilnicaStatus',
                    error: err
                });
            }

            if (!polnilnicaStatus) {
                return res.status(404).json({
                    message: 'No such polnilnicaStatus'
                });
            }

            polnilnicaStatus.id = req.body.id ? req.body.id : polnilnicaStatus.id;
			polnilnicaStatus.operational = req.body.operational ? req.body.operational : polnilnicaStatus.operational;
			polnilnicaStatus.userSelectable = req.body.userSelectable ? req.body.userSelectable : polnilnicaStatus.userSelectable;
			polnilnicaStatus.currentlyOccupied = req.body.currentlyOccupied ? req.body.currentlyOccupied : polnilnicaStatus.currentlyOccupied;
			polnilnicaStatus.title = req.body.title ? req.body.title : polnilnicaStatus.title;
			
            polnilnicaStatus.save(function (err, polnilnicaStatus) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating polnilnicaStatus.',
                        error: err
                    });
                }

                return res.json(polnilnicaStatus);
            });
        });
    },

    /**
     * polnilnicaStatusController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PolnilnicastatusModel.findByIdAndRemove(id, function (err, polnilnicaStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the polnilnicaStatus.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
