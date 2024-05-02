var ElektropolnilnicaModel = require('../models/elektroPolnilnicaModel.js');

/**
 * elektroPolnilnicaController.js
 *
 * @description :: Server-side logic for managing elektroPolnilnicas.
 */
module.exports = {

    /**
     * elektroPolnilnicaController.list()
     */
    list: function (req, res) {
        ElektropolnilnicaModel.find(function (err, elektroPolnilnicas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting elektroPolnilnica.',
                    error: err
                });
            }

            return res.json(elektroPolnilnicas);
        });
    },

    /**
     * elektroPolnilnicaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ElektropolnilnicaModel.findOne({_id: id}, function (err, elektroPolnilnica) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting elektroPolnilnica.',
                    error: err
                });
            }

            if (!elektroPolnilnica) {
                return res.status(404).json({
                    message: 'No such elektroPolnilnica'
                });
            }

            return res.json(elektroPolnilnica);
        });
    },

    /**
     * elektroPolnilnicaController.create()
     */
    create: function (req, res) {
        var elektroPolnilnica = new ElektropolnilnicaModel({
			id : req.body.id,
			dateLastVerified : req.body.dateLastVerified,
			UUID : req.body.UUID,
			dataProviderID : req.body.dataProviderID,
			usageCost : req.body.usageCost,
			usageTypeID : req.body.usageTypeID,
			addressID : req.body.addressID,
			connectionID : req.body.connectionID,
			dateCreated : req.body.dateCreated,
			submissionStatusTypeID : req.body.submissionStatusTypeID,
			numberOfPoints : req.body.numberOfPoints,
			statusTypeID : req.body.statusTypeID,
			dateLastConfirmed : req.body.dateLastConfirmed,
			comments : req.body.comments
        });

        elektroPolnilnica.save(function (err, elektroPolnilnica) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating elektroPolnilnica',
                    error: err
                });
            }

            return res.status(201).json(elektroPolnilnica);
        });
    },

    /**
     * elektroPolnilnicaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ElektropolnilnicaModel.findOne({_id: id}, function (err, elektroPolnilnica) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting elektroPolnilnica',
                    error: err
                });
            }

            if (!elektroPolnilnica) {
                return res.status(404).json({
                    message: 'No such elektroPolnilnica'
                });
            }

            elektroPolnilnica.id = req.body.id ? req.body.id : elektroPolnilnica.id;
			elektroPolnilnica.dateLastVerified = req.body.dateLastVerified ? req.body.dateLastVerified : elektroPolnilnica.dateLastVerified;
			elektroPolnilnica.UUID = req.body.UUID ? req.body.UUID : elektroPolnilnica.UUID;
			elektroPolnilnica.dataProviderID = req.body.dataProviderID ? req.body.dataProviderID : elektroPolnilnica.dataProviderID;
			elektroPolnilnica.usageCost = req.body.usageCost ? req.body.usageCost : elektroPolnilnica.usageCost;
			elektroPolnilnica.usageTypeID = req.body.usageTypeID ? req.body.usageTypeID : elektroPolnilnica.usageTypeID;
			elektroPolnilnica.addressID = req.body.addressID ? req.body.addressID : elektroPolnilnica.addressID;
			elektroPolnilnica.connectionID = req.body.connectionID ? req.body.connectionID : elektroPolnilnica.connectionID;
			elektroPolnilnica.dateCreated = req.body.dateCreated ? req.body.dateCreated : elektroPolnilnica.dateCreated;
			elektroPolnilnica.submissionStatusTypeID = req.body.submissionStatusTypeID ? req.body.submissionStatusTypeID : elektroPolnilnica.submissionStatusTypeID;
			elektroPolnilnica.numberOfPoints = req.body.numberOfPoints ? req.body.numberOfPoints : elektroPolnilnica.numberOfPoints;
			elektroPolnilnica.statusTypeID = req.body.statusTypeID ? req.body.statusTypeID : elektroPolnilnica.statusTypeID;
			elektroPolnilnica.dateLastConfirmed = req.body.dateLastConfirmed ? req.body.dateLastConfirmed : elektroPolnilnica.dateLastConfirmed;
			elektroPolnilnica.comments = req.body.comments ? req.body.comments : elektroPolnilnica.comments;
			
            elektroPolnilnica.save(function (err, elektroPolnilnica) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating elektroPolnilnica.',
                        error: err
                    });
                }

                return res.json(elektroPolnilnica);
            });
        });
    },

    /**
     * elektroPolnilnicaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ElektropolnilnicaModel.findByIdAndRemove(id, function (err, elektroPolnilnica) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the elektroPolnilnica.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
