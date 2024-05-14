var AddressModel = require('../../models/openmap_search/searchAddressModel.js');

/**
 * searchAddressController.js
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
                    message: 'Error when getting searchAddress.',
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

        AddressModel.findOne({_id: id}, function (err, searchAddress) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchAddress.',
                    error: err
                });
            }

            if (!searchAddress) {
                return res.status(404).json({
                    message: 'No such searchAddress'
                });
            }

            return res.json(searchAddress);
        });
    },

    /**
     * addressController.create()
     */
    create: function (req, res) {
        var searchAddress = new AddressModel({
			id : req.body.id,
			title : req.body.title,
			addressLine1 : req.body.addressLine1,
			addressLine2 : req.body.addressLine2,
			town : req.body.town,
			postcode : req.body.postcode,
			country : req.body.country,
			latitude : req.body.latitude,
			longitude : req.body.longitude
        });

        searchAddress.save(function (err, searchAddress) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating searchAddress',
                    error: err
                });
            }

            return res.status(201).json(searchAddress);
        });
    },

    /**
     * addressController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        AddressModel.findOne({_id: id}, function (err, searchAddress) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting searchAddress',
                    error: err
                });
            }

            if (!searchAddress) {
                return res.status(404).json({
                    message: 'No such searchAddress'
                });
            }

            searchAddress.id = req.body.id ? req.body.id : searchAddress.id;
			searchAddress.title = req.body.title ? req.body.title : searchAddress.title;
			searchAddress.addressLine1 = req.body.addressLine1 ? req.body.addressLine1 : searchAddress.addressLine1;
			searchAddress.addressLine2 = req.body.addressLine2 ? req.body.addressLine2 : searchAddress.addressLine2;
			searchAddress.town = req.body.town ? req.body.town : searchAddress.town;
			searchAddress.postcode = req.body.postcode ? req.body.postcode : searchAddress.postcode;
			searchAddress.country = req.body.country ? req.body.country : searchAddress.country;
			searchAddress.latitude = req.body.latitude ? req.body.latitude : searchAddress.latitude;
			searchAddress.longitude = req.body.longitude ? req.body.longitude : searchAddress.longitude;
			
            searchAddress.save(function (err, searchAddress) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating searchAddress.',
                        error: err
                    });
                }

                return res.json(searchAddress);
            });
        });
    },

    /**
     * addressController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        AddressModel.findByIdAndRemove(id, function (err, searchAddress) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the searchAddress.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
