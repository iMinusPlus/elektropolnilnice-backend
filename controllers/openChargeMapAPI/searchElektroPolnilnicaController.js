var ElektropolnilnicaModel = require('../../models/polnilnice/elektroPolnilnicaModel.js')
var ConnectionModel = require('../../models/polnilnice/connectionModel')
var AddressModel = require('../../models/polnilnice/addressModel')
const ConnectionTypeModel = require("../../models/polnilnice/connectionTypeModel");
// const {Connection} = require("mongoose");


module.exports = {
    testOpenCharge: async function (req, res) {
        const url = new URL("https://api.openchargemap.io/v3/poi/?output=json&countrycode=SI&latitude=46.5547&longitude=15.6459&maxresults=100&distance=25&key=50062ab3-b707-4dea-9da7-c8611695a9ff");
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong" + response.statusText);
            }
            const data = await response.json();
            return res.json(ElektropolnilnicaModel.getFromOpenChargeJson(data[0]));
        } catch (error) {
            console.error(error)
        }
    },

    fetchOpenChargeData: async function (req, res) {
        const url = new URL("https://api.openchargemap.io/v3/poi/?output=json&countrycode=SI&latitude=46.5547&longitude=15.6459&maxresults=100&distance=25&key=50062ab3-b707-4dea-9da7-c8611695a9ff");
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong" + response.statusText);
            }
            const data = await response.json();
            for (const item of data) {

                let result = ElektropolnilnicaModel.getFromOpenChargeJson(item);

                // find if exists RealPolnilnica with same id
                try {
                    var polnilnica = await ElektropolnilnicaModel.findOne({UUID: result.UUID});

                    if (polnilnica !== null) {
                        console.log("Updating");
                        //TODO update
                    } else {
                        console.log("Creating");
                        ElektropolnilnicaModel.create(result, function (err, connection) {
                            if (err) {
                                console.error(err);
                                return res.status(500).json(err);
                            }
                        });

                        const naslov = await AddressModel.findOne({id: SearchAddressModel.getFromJson(item.AddressInfo).id});
                        if (naslov === null) {
                            AddressModel.create(SearchAddressModel.getFromJson(item.AddressInfo), function (err, connection) {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json(err);
                                }
                            });
                        }

                        for (connections of item.Connections) {
                            var connectionType = await ConnectionTypeModel.findOne({id: SearchConnectionTypeModel.getFromJson(connections.ConnectionType).id});
                            if (connectionType === null) {
                                ConnectionTypeModel.create(SearchConnectionTypeModel.getFromJson(connections.ConnectionType), function (err, connection) {
                                    if (err) {
                                        console.error(err);
                                        return res.status(500).json(err);
                                    }
                                });
                            }

                            var connection = await ConnectionModel.findOne({id: SearchConnectionModel.getFromJson(connections).id});

                            if (connection === null) {
                                ConnectionModel.create(SearchConnectionModel.getFromJson(connections), function (err, connection) {
                                    if (err) {
                                        console.error(err);
                                        return res.status(500).json(err);
                                    }
                                });
                            }
                        }
                    }
                } catch (err) {
                    console.log("Error in finding polnilnica")
                    console.error(err);
                    return res.status(500).json(err);
                }
            }

            return res.json("Data saved");
        } catch (error) {
            console.error(error)
        }
    }
};
