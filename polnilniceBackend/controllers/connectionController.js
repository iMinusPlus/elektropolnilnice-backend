var ConnectionModel = require('../models/connectionModel.js');

/**
 * connectionController.js
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
                    message: 'Error when getting connection.',
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

        ConnectionModel.findOne({_id: id}, function (err, connection) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting connection.',
                    error: err
                });
            }

            if (!connection) {
                return res.status(404).json({
                    message: 'No such connection'
                });
            }

            return res.json(connection);
        });
    },

    /**
     * connectionController.create()
     */
    create: function (req, res) {
        var connection = new ConnectionModel({
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

        connection.save(function (err, connection) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating connection',
                    error: err
                });
            }

            return res.status(201).json(connection);
        });
    },

    /**
     * connectionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ConnectionModel.findOne({_id: id}, function (err, connection) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting connection',
                    error: err
                });
            }

            if (!connection) {
                return res.status(404).json({
                    message: 'No such connection'
                });
            }

            connection.id = req.body.id ? req.body.id : connection.id;
			connection.connectionTypeID = req.body.connectionTypeID ? req.body.connectionTypeID : connection.connectionTypeID;
			connection.reference = req.body.reference ? req.body.reference : connection.reference;
			connection.statusTypeID = req.body.statusTypeID ? req.body.statusTypeID : connection.statusTypeID;
			connection.levelID = req.body.levelID ? req.body.levelID : connection.levelID;
			connection.amps = req.body.amps ? req.body.amps : connection.amps;
			connection.voltage = req.body.voltage ? req.body.voltage : connection.voltage;
			connection.powerKW = req.body.powerKW ? req.body.powerKW : connection.powerKW;
			connection.currentTypeID = req.body.currentTypeID ? req.body.currentTypeID : connection.currentTypeID;
			connection.quantity = req.body.quantity ? req.body.quantity : connection.quantity;
			connection.comments = req.body.comments ? req.body.comments : connection.comments;
			
            connection.save(function (err, connection) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating connection.',
                        error: err
                    });
                }

                return res.json(connection);
            });
        });
    },

    /**
     * connectionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ConnectionModel.findByIdAndRemove(id, function (err, connection) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the connection.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
