var ConnectiontypeModel = require('../../models/openmap_search/searchConnectionTypeModel.js');

/**
 * searchConnectionTypeController.js
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
                    message: 'Error when getting searchConnectionType.',
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

        ConnectiontypeModel.findOne({_id: id}, function (err, searchConnectionType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchConnectionType.',
                    error: err
                });
            }

            if (!searchConnectionType) {
                return res.status(404).json({
                    message: 'No such searchConnectionType'
                });
            }

            return res.json(searchConnectionType);
        });
    },

    /**
     * connectionTypeController.create()
     */
    create: function (req, res) {
        var searchConnectionType = new ConnectiontypeModel({
			id : req.body.id,
			formalName : req.body.formalName,
			discontinued : req.body.discontinued,
			obsolete : req.body.obsolete,
			title : req.body.title
        });

        searchConnectionType.save(function (err, searchConnectionType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating searchConnectionType',
                    error: err
                });
            }

            return res.status(201).json(searchConnectionType);
        });
    },

    /**
     * connectionTypeController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ConnectiontypeModel.findOne({_id: id}, function (err, searchConnectionType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchConnectionType',
                    error: err
                });
            }

            if (!searchConnectionType) {
                return res.status(404).json({
                    message: 'No such searchConnectionType'
                });
            }

            searchConnectionType.id = req.body.id ? req.body.id : searchConnectionType.id;
			searchConnectionType.formalName = req.body.formalName ? req.body.formalName : searchConnectionType.formalName;
			searchConnectionType.discontinued = req.body.discontinued ? req.body.discontinued : searchConnectionType.discontinued;
			searchConnectionType.obsolete = req.body.obsolete ? req.body.obsolete : searchConnectionType.obsolete;
			searchConnectionType.title = req.body.title ? req.body.title : searchConnectionType.title;
			
            searchConnectionType.save(function (err, searchConnectionType) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating searchConnectionType.',
                        error: err
                    });
                }

                return res.json(searchConnectionType);
            });
        });
    },

    /**
     * connectionTypeController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ConnectiontypeModel.findByIdAndRemove(id, function (err, searchConnectionType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the searchConnectionType.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
