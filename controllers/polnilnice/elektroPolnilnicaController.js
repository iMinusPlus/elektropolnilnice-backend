var ElektropolnilnicaModel = require('../../models/polnilnice/elektroPolnilnicaModel.js');

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
			usageType : req.body.usageType,
			address : req.body.address,
			connections : req.body.connections,
			dateCreated : req.body.dateCreated,
			dateAddedToOurApp : req.body.dateAddedToOurApp,
			submissionStatusTypeID : req.body.submissionStatusTypeID,
			numberOfPoints : req.body.numberOfPoints,
			status : req.body.status,
			dateLastCOnfirmed : req.body.dateLastCOnfirmed,
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
			elektroPolnilnica.usageType = req.body.usageType ? req.body.usageType : elektroPolnilnica.usageType;
			elektroPolnilnica.address = req.body.address ? req.body.address : elektroPolnilnica.address;
			elektroPolnilnica.connections = req.body.connections ? req.body.connections : elektroPolnilnica.connections;
			elektroPolnilnica.dateCreated = req.body.dateCreated ? req.body.dateCreated : elektroPolnilnica.dateCreated;
			elektroPolnilnica.dateAddedToOurApp = req.body.dateAddedToOurApp ? req.body.dateAddedToOurApp : elektroPolnilnica.dateAddedToOurApp;
			elektroPolnilnica.submissionStatusTypeID = req.body.submissionStatusTypeID ? req.body.submissionStatusTypeID : elektroPolnilnica.submissionStatusTypeID;
			elektroPolnilnica.numberOfPoints = req.body.numberOfPoints ? req.body.numberOfPoints : elektroPolnilnica.numberOfPoints;
			elektroPolnilnica.status = req.body.status ? req.body.status : elektroPolnilnica.status;
			elektroPolnilnica.dateLastCOnfirmed = req.body.dateLastCOnfirmed ? req.body.dateLastCOnfirmed : elektroPolnilnica.dateLastCOnfirmed;
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
    },
    /**
     * elektroPolnilnicaController.remove()
     */
    app: async function (req, res) {
        //{id=296026, dateLastVerified=2024-03-05, UUID=7E81DB8C-3C24-4793-BB6D-1AFE2A75D64E, dataProviderID=1,
        // usageCost=Free, usageTypeID=1, address=664cc1bbebab29e17c96196b, connections=[664cc1bbebab29e17c9619f5, 664cc1bbebab29e17c961a46, 664cc1bbebab29e17c961aa4],
        // dateCreated=2024-03-02, dateAddedToOurApp=2024-06-09, numberOfPoints=2, statusType=FREE, dateLastConfirmed=2024-06-09, comments=null}


        let str = req.body.connections;
        str = str.replace(/[\[\] ]/g, "").split(',').map(s => `"${s}"`);
        str = `[${str.join(",")}]`;
        let arr = JSON.parse(str);

        let station = {
            id: req.body.id,
            dateLastVerified: req.body.dateLastVerified,
            UUID: req.body.UUID,
            dataProviderID: req.body.dataProviderID,
            usageCost: req.body.usageCost,
            usageType: req.body.usageType,
            address: req.body.address,
            connections: arr,
            dateCreated: req.body.dateCreated,
            dateAddedToOurApp: req.body.dateAddedToOurApp,
            numberOfPoints: req.body.numberOfPoints,
            status: req.body.status,
            dateLastConfirmed: req.body.dateLastConfirmed,
            comments: req.body.comments
        };

        // Remove _id from the update object
        if (station._id) {
            delete station._id;
        }

        let savedElp = await ElektropolnilnicaModel.findOneAndUpdate(
            {id: station.id}, // filter
            station, // update
            {new: true, upsert: true} // options
        ).exec();

        let objectId = savedElp._id;
        return res.status(200).json({
            message: objectId
        });
    }

};
