var StatustypeModel = require('../../models/openmap_search/searchStatusTypeModel.js');

/**
 * searchStatusTypeController.js
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
                    message: 'Error when getting searchStatusType.',
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

        StatustypeModel.findOne({_id: id}, function (err, searchStatusType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchStatusType.',
                    error: err
                });
            }

            if (!searchStatusType) {
                return res.status(404).json({
                    message: 'No such searchStatusType'
                });
            }

            return res.json(searchStatusType);
        });
    },

    /**
     * statusTypeController.create()
     */
    create: function (req, res) {
        var searchStatusType = new StatustypeModel({
			id : req.body.id,
			operational : req.body.operational,
			userSelectable : req.body.userSelectable,
			title : req.body.title
        });

        searchStatusType.save(function (err, searchStatusType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating searchStatusType',
                    error: err
                });
            }

            return res.status(201).json(searchStatusType);
        });
    },

    /**
     * statusTypeController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        StatustypeModel.findOne({_id: id}, function (err, searchStatusType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchStatusType',
                    error: err
                });
            }

            if (!searchStatusType) {
                return res.status(404).json({
                    message: 'No such searchStatusType'
                });
            }

            searchStatusType.id = req.body.id ? req.body.id : searchStatusType.id;
			searchStatusType.operational = req.body.operational ? req.body.operational : searchStatusType.operational;
			searchStatusType.userSelectable = req.body.userSelectable ? req.body.userSelectable : searchStatusType.userSelectable;
			searchStatusType.title = req.body.title ? req.body.title : searchStatusType.title;
			
            searchStatusType.save(function (err, searchStatusType) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating searchStatusType.',
                        error: err
                    });
                }

                return res.json(searchStatusType);
            });
        });
    },

    /**
     * statusTypeController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        StatustypeModel.findByIdAndRemove(id, function (err, searchStatusType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the searchStatusType.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
