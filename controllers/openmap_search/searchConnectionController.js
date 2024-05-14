var ConnectionModel = require('../../models/openmap_search/searchConnectionModel.js');

/**
 * searchConnectionController.js
 *
 * @description :: Server-side logic for managing connections.
 */
module.exports = {

    /**
     * connectionController.list()
     */
    list: function (req, res) {
        ConnectionModel.find(function (err, connections) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchConnection.',
                    error: err
                });
            }

            return res.json(connections);
        });
    },

    /**
     * connectionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ConnectionModel.findOne({_id: id}, function (err, searchConnection) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchConnection.',
                    error: err
                });
            }

            if (!searchConnection) {
                return res.status(404).json({
                    message: 'No such searchConnection'
                });
            }

            return res.json(searchConnection);
        });
    },

    /**
     * connectionController.create()
     */
    create: function (req, res) {
        var searchConnection = new ConnectionModel({
			id : req.body.id,
			connectionTypeID : req.body.connectionTypeID,
			reference : req.body.reference,
			statusTypeID : req.body.statusTypeID,
			levelID : req.body.levelID,
			amps : req.body.amps,
			voltage : req.body.voltage,
			powerKW : req.body.powerKW,
			currentTypeID : req.body.currentTypeID,
			quantity : req.body.quantity,
			comments : req.body.comments
        });

        searchConnection.save(function (err, searchConnection) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating searchConnection',
                    error: err
                });
            }

            return res.status(201).json(searchConnection);
        });
    },

    /**
     * connectionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ConnectionModel.findOne({_id: id}, function (err, searchConnection) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchConnection',
                    error: err
                });
            }

            if (!searchConnection) {
                return res.status(404).json({
                    message: 'No such searchConnection'
                });
            }

            searchConnection.id = req.body.id ? req.body.id : searchConnection.id;
			searchConnection.connectionTypeID = req.body.connectionTypeID ? req.body.connectionTypeID : searchConnection.connectionTypeID;
			searchConnection.reference = req.body.reference ? req.body.reference : searchConnection.reference;
			searchConnection.statusTypeID = req.body.statusTypeID ? req.body.statusTypeID : searchConnection.statusTypeID;
			searchConnection.levelID = req.body.levelID ? req.body.levelID : searchConnection.levelID;
			searchConnection.amps = req.body.amps ? req.body.amps : searchConnection.amps;
			searchConnection.voltage = req.body.voltage ? req.body.voltage : searchConnection.voltage;
			searchConnection.powerKW = req.body.powerKW ? req.body.powerKW : searchConnection.powerKW;
			searchConnection.currentTypeID = req.body.currentTypeID ? req.body.currentTypeID : searchConnection.currentTypeID;
			searchConnection.quantity = req.body.quantity ? req.body.quantity : searchConnection.quantity;
			searchConnection.comments = req.body.comments ? req.body.comments : searchConnection.comments;
			
            searchConnection.save(function (err, searchConnection) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating searchConnection.',
                        error: err
                    });
                }

                return res.json(searchConnection);
            });
        });
    },

    /**
     * connectionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ConnectionModel.findByIdAndRemove(id, function (err, searchConnection) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the searchConnection.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
