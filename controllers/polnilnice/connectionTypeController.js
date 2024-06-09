var ConnectiontypeModel = require('../../models/polnilnice/connectionTypeModel.js');
const AddressModel = require("../../models/polnilnice/addressModel");

/**
 * connectionTypeController.js
 *
 * @description :: Server-side logic for managing connectionTypes.
 */
module.exports = {

    /**
     * connectionTypeController.list()
     */
    list: function (req, res) {
        ConnectiontypeModel.find(function (err, connectionTypes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting connectionType.',
                    error: err
                });
            }

            return res.json(connectionTypes);
        });
    },

    /**
     * connectionTypeController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ConnectiontypeModel.findOne({_id: id}, function (err, connectionType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting connectionType.',
                    error: err
                });
            }

            if (!connectionType) {
                return res.status(404).json({
                    message: 'No such connectionType'
                });
            }

            return res.json(connectionType);
        });
    },

    /**
     * connectionTypeController.create()
     */
    create: function (req, res) {
        var connectionType = new ConnectiontypeModel({
			id : req.body.id,
			name : req.body.name,
			discontinued : req.body.discontinued,
			obsolete : req.body.obsolete,
			title : req.body.title
        });

        connectionType.save(function (err, connectionType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating connectionType',
                    error: err
                });
            }

            return res.status(201).json(connectionType);
        });
    },

    /**
     * connectionTypeController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ConnectiontypeModel.findOne({_id: id}, function (err, connectionType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting connectionType',
                    error: err
                });
            }

            if (!connectionType) {
                return res.status(404).json({
                    message: 'No such connectionType'
                });
            }

            connectionType.id = req.body.id ? req.body.id : connectionType.id;
			connectionType.name = req.body.name ? req.body.name : connectionType.name;
			connectionType.discontinued = req.body.discontinued ? req.body.discontinued : connectionType.discontinued;
			connectionType.obsolete = req.body.obsolete ? req.body.obsolete : connectionType.obsolete;
			connectionType.title = req.body.title ? req.body.title : connectionType.title;
			
            connectionType.save(function (err, connectionType) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating connectionType.',
                        error: err
                    });
                }

                return res.json(connectionType);
            });
        });
    },

    /**
     * connectionTypeController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ConnectiontypeModel.findByIdAndRemove(id, function (err, connectionType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the connectionType.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    /**
     * connectionTypeController.app()
     */
    app: async function (req, res) {
        let connType = {
            id: req.body.id,
            name: req.body.name,
            discontinued: req.body.discontinued,
            obsolete: req.body.obsolete,
            title: req.body.title
        };

        // Remove _id from the update object
        if (connType._id) {
            delete connType._id;
        }

        let savedConnType = await AddressModel.findOneAndUpdate(
            {id: connType.id}, // filter
            connType, // update
            {new: true, upsert: true} // options
        ).exec();

        let objectId = savedConnType._id;
        return res.status(200).json({
            message: objectId
        });
    }
};
