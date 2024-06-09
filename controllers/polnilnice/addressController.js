var AddressModel = require('../../models/polnilnice/addressModel.js');
const {log} = require("debug");

/**
 * addressController.js
 *
 * @description :: Server-side logic for managing addresss.
 */
module.exports = {

    /**
     * addressController.list()
     */
    list: function (req, res) {
        AddressModel.find(function (err, addresss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting address.',
                    error: err
                });
            }

            return res.json(addresss);
        });
    },

    /**
     * addressController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        AddressModel.findOne({_id: id}, function (err, address) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting address.',
                    error: err
                });
            }

            if (!address) {
                return res.status(404).json({
                    message: 'No such address'
                });
            }

            return res.json(address);
        });
    },

    /**
     * addressController.create()
     */
    create: function (req, res) {
        var address = new AddressModel({
			id : req.body.id,
			title : req.body.title,
			town : req.body.town,
			postcode : req.body.postcode,
			country : req.body.country,
			latitude : req.body.latitude,
			longitude : req.body.longitude
        });

        address.save(function (err, address) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating address',
                    error: err
                });
            }

            return res.status(201).json(address);
        });
    },

    /**
     * addressController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        AddressModel.findOne({_id: id}, function (err, address) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting address',
                    error: err
                });
            }

            if (!address) {
                return res.status(404).json({
                    message: 'No such address'
                });
            }

            address.id = req.body.id ? req.body.id : address.id;
			address.title = req.body.title ? req.body.title : address.title;
			address.town = req.body.town ? req.body.town : address.town;
			address.postcode = req.body.postcode ? req.body.postcode : address.postcode;
			address.country = req.body.country ? req.body.country : address.country;
			address.latitude = req.body.latitude ? req.body.latitude : address.latitude;
			address.longitude = req.body.longitude ? req.body.longitude : address.longitude;
			
            address.save(function (err, address) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating address.',
                        error: err
                    });
                }

                return res.json(address);
            });
        });
    },

    /**
     * addressController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        AddressModel.findByIdAndRemove(id, function (err, address) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the address.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    /**
     * addressController.app()
     */
    app: async function (req, res) {

        let address = {
            id: req.body.id,
            title: req.body.title,
            town: req.body.town,
            postcode: req.body.postcode,
            country: req.body.country,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        };

        // Remove _id from the update object
        if (address._id) {
            delete address._id;
        }

        let savedAddress = await AddressModel.findOneAndUpdate(
            {id: address.id}, // filter
            address, // update
            {new: true, upsert: true} // options
        ).exec();

        let objectId = savedAddress._id;
        return res.status(200).json({
            message: objectId
        });
    }
};
