var PolnilnicausagetrackerModel = require('../../models/tracking/polnilnicaUsageTrackerModel.js');

/**
 * polnilnicaUsageTrackerController.js
 *
 * @description :: Server-side logic for managing polnilnicaUsageTrackers.
 */
module.exports = {

    /**
     * polnilnicaUsageTrackerController.list()
     */
    list: function (req, res) {
        PolnilnicausagetrackerModel.find(function (err, polnilnicaUsageTrackers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting polnilnicaUsageTracker.',
                    error: err
                });
            }

            return res.json(polnilnicaUsageTrackers);
        });
    },

    /**
     * polnilnicaUsageTrackerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PolnilnicausagetrackerModel.findOne({_id: id}, function (err, polnilnicaUsageTracker) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting polnilnicaUsageTracker.',
                    error: err
                });
            }

            if (!polnilnicaUsageTracker) {
                return res.status(404).json({
                    message: 'No such polnilnicaUsageTracker'
                });
            }

            return res.json(polnilnicaUsageTracker);
        });
    },

    /**
     * polnilnicaUsageTrackerController.create()
     */
    create: function (req, res) {
        var polnilnicaUsageTracker = new PolnilnicausagetrackerModel({
			id : req.body.id,
			polnilnica : req.body.polnilnica,
			dateFrom : req.body.dateFrom,
			dateTo : req.body.dateTo,
			ser : req.body.ser,
			user : req.body.user
        });

        polnilnicaUsageTracker.save(function (err, polnilnicaUsageTracker) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating polnilnicaUsageTracker',
                    error: err
                });
            }

            return res.status(201).json(polnilnicaUsageTracker);
        });
    },

    /**
     * polnilnicaUsageTrackerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PolnilnicausagetrackerModel.findOne({_id: id}, function (err, polnilnicaUsageTracker) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting polnilnicaUsageTracker',
                    error: err
                });
            }

            if (!polnilnicaUsageTracker) {
                return res.status(404).json({
                    message: 'No such polnilnicaUsageTracker'
                });
            }

            polnilnicaUsageTracker.id = req.body.id ? req.body.id : polnilnicaUsageTracker.id;
			polnilnicaUsageTracker.polnilnica = req.body.polnilnica ? req.body.polnilnica : polnilnicaUsageTracker.polnilnica;
			polnilnicaUsageTracker.dateFrom = req.body.dateFrom ? req.body.dateFrom : polnilnicaUsageTracker.dateFrom;
			polnilnicaUsageTracker.dateTo = req.body.dateTo ? req.body.dateTo : polnilnicaUsageTracker.dateTo;
			polnilnicaUsageTracker.ser = req.body.ser ? req.body.ser : polnilnicaUsageTracker.ser;
			polnilnicaUsageTracker.user = req.body.user ? req.body.user : polnilnicaUsageTracker.user;
			
            polnilnicaUsageTracker.save(function (err, polnilnicaUsageTracker) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating polnilnicaUsageTracker.',
                        error: err
                    });
                }

                return res.json(polnilnicaUsageTracker);
            });
        });
    },

    /**
     * polnilnicaUsageTrackerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PolnilnicausagetrackerModel.findByIdAndRemove(id, function (err, polnilnicaUsageTracker) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the polnilnicaUsageTracker.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
