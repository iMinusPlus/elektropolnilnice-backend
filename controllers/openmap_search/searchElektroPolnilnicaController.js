var ElektropolnilnicaModel = require('../../models/openmap_search/searchElektroPolnilnicaModel.js');

/**
 * searchElektroPolnilnicaController.js
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
                    message: 'Error when getting searchElektroPolnilnica.',
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

        ElektropolnilnicaModel.findOne({_id: id}, function (err, searchElektroPolnilnica) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchElektroPolnilnica.',
                    error: err
                });
            }

            if (!searchElektroPolnilnica) {
                return res.status(404).json({
                    message: 'No such searchElektroPolnilnica'
                });
            }

            return res.json(searchElektroPolnilnica);
        });
    },

    /**
     * elektroPolnilnicaController.create()
     */
    create: function (req, res) {
        var searchElektroPolnilnica = new ElektropolnilnicaModel({
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

        searchElektroPolnilnica.save(function (err, searchElektroPolnilnica) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating searchElektroPolnilnica',
                    error: err
                });
            }

            return res.status(201).json(searchElektroPolnilnica);
        });
    },

    /**
     * elektroPolnilnicaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ElektropolnilnicaModel.findOne({_id: id}, function (err, searchElektroPolnilnica) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchElektroPolnilnica',
                    error: err
                });
            }

            if (!searchElektroPolnilnica) {
                return res.status(404).json({
                    message: 'No such searchElektroPolnilnica'
                });
            }

            searchElektroPolnilnica.id = req.body.id ? req.body.id : searchElektroPolnilnica.id;
			searchElektroPolnilnica.dateLastVerified = req.body.dateLastVerified ? req.body.dateLastVerified : searchElektroPolnilnica.dateLastVerified;
			searchElektroPolnilnica.UUID = req.body.UUID ? req.body.UUID : searchElektroPolnilnica.UUID;
			searchElektroPolnilnica.dataProviderID = req.body.dataProviderID ? req.body.dataProviderID : searchElektroPolnilnica.dataProviderID;
			searchElektroPolnilnica.usageCost = req.body.usageCost ? req.body.usageCost : searchElektroPolnilnica.usageCost;
			searchElektroPolnilnica.usageTypeID = req.body.usageTypeID ? req.body.usageTypeID : searchElektroPolnilnica.usageTypeID;
			searchElektroPolnilnica.addressID = req.body.addressID ? req.body.addressID : searchElektroPolnilnica.addressID;
			searchElektroPolnilnica.connectionID = req.body.connectionID ? req.body.connectionID : searchElektroPolnilnica.connectionID;
			searchElektroPolnilnica.dateCreated = req.body.dateCreated ? req.body.dateCreated : searchElektroPolnilnica.dateCreated;
			searchElektroPolnilnica.submissionStatusTypeID = req.body.submissionStatusTypeID ? req.body.submissionStatusTypeID : searchElektroPolnilnica.submissionStatusTypeID;
			searchElektroPolnilnica.numberOfPoints = req.body.numberOfPoints ? req.body.numberOfPoints : searchElektroPolnilnica.numberOfPoints;
			searchElektroPolnilnica.statusTypeID = req.body.statusTypeID ? req.body.statusTypeID : searchElektroPolnilnica.statusTypeID;
			searchElektroPolnilnica.dateLastConfirmed = req.body.dateLastConfirmed ? req.body.dateLastConfirmed : searchElektroPolnilnica.dateLastConfirmed;
			searchElektroPolnilnica.comments = req.body.comments ? req.body.comments : searchElektroPolnilnica.comments;
			
            searchElektroPolnilnica.save(function (err, searchElektroPolnilnica) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating searchElektroPolnilnica.',
                        error: err
                    });
                }

                return res.json(searchElektroPolnilnica);
            });
        });
    },

    /**
     * elektroPolnilnicaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ElektropolnilnicaModel.findByIdAndRemove(id, function (err, searchElektroPolnilnica) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the searchElektroPolnilnica.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    testOpenCharge: async function (req, res) {
        const url = new URL("https://api.openchargemap.io/v3/poi/?output=json&countrycode=SI&maxresults=1&key=50062ab3-b707-4dea-9da7-c8611695a9ff"); //todo potem spremeniti in sestaviti po pravilih
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong" + response.statusText);
            }
            const data = await response.json();
            // console.log(data)

            //Todo pretvoriti v search model
            result = ElektropolnilnicaModel.getFromJson(data[0]);
            return res.json(result);
        } catch (error) {
            console.error(error)
        }
    },
};
