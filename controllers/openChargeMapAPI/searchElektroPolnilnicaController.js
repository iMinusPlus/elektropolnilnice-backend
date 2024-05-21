var ElektropolnilnicaModel = require('../../models/polnilnice/elektroPolnilnicaModel.js')
var ConnectionModel = require('../../models/polnilnice/connectionModel')
var AddressModel = require('../../models/polnilnice/addressModel')
const ConnectionTypeModel = require("../../models/polnilnice/connectionTypeModel");
const {add} = require("nodemon/lib/rules");
const {ObjectId} = require("mongodb");
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

                let address = {
                    id: item.AddressInfo.ID,
                    title: item.AddressInfo.Title,
                    town: item.AddressInfo.Town,
                    postcode: item.AddressInfo.Postcode,
                    country: item.AddressInfo.Country.Title,
                    latitude: item.AddressInfo.Latitude,
                    longitude: item.AddressInfo.Longitude,
                };

                // Remove _id from the update object
                if (address._id) {
                    delete address._id;
                }

                // Find the address and update it if it exists, otherwise create a new one
                let savedAddress = await AddressModel.findOneAndUpdate(
                    { id: address.id }, // filter
                    address, // update
                    { new: true, upsert: true } // options
                );

                let savedConnections = [];
                for (const conn of item.Connections) {

                    let connectionType = {
                        id: conn.ConnectionType.ID,
                        name: conn.ConnectionType.FormalName,
                        discontinued: conn.ConnectionType.IsDiscontinued,
                        obsolete: conn.ConnectionType.IsObsolete,
                        title: conn.ConnectionType.Title
                    };

                    // Remove _id from the update object
                    if (connectionType._id) {
                        delete connectionType._id;
                    }

                    // Find the address and update it if it exists, otherwise create a new one
                    let savedConnectionType = await ConnectionTypeModel.findOneAndUpdate(
                        { id: connectionType.id }, // filter
                        connectionType, // update
                        { new: true, upsert: true } // options
                    );

                    let connection = {
                        id: conn.ID,
                        connectionType: savedAddress._id,
                        reference: conn.Reference,
                        amps: conn.Amps,
                        voltage: conn.Voltage,
                        powerKW: conn.PowerKW,
                        currentType: conn.CurrentTypeID,
                        quantity: conn.Quantity,
                        comments: "null",
                    };

                    // Remove _id from the update object
                    if (connection._id) {
                        delete connection._id;
                    }

                    // Find the connection and update it if it exists, otherwise create a new one
                    let savedConnection = await ConnectionModel.findOneAndUpdate(
                        { id: connection.id }, // filter
                        connection, // update
                        { new: true, upsert: true } // options
                    );

                    savedConnections.push(savedConnection._id);
                }

                let elektropolnilnica = {
                    id: item.ID,
                    dateLastVerified: item.DateLastVerified,
                    UUID: item.UUID,
                    dataProviderID: item.DataProvider.ID,
                    usageCost: item.UsageCost,
                    usageType: item.UsageType.ID,
                    address: savedAddress._id,
                    connections: savedConnections,
                    dateCreated: item.DateCreated,
                    dateAddedToOurApp: new Date(),
                    numberOfPoints: item.NumberOfPoints,
                    status: new ObjectId("60b1f3b3b3b3b3b3b3b3b3b3"), //todo: change to status
                    dateLastConfirmed: item.DateLastConfirmed,
                    comments: "null",
                };


                // Remove _id from the update object
                if (elektropolnilnica._id) {
                    delete elektropolnilnica._id;
                }

                // Find the connection and update it if it exists, otherwise create a new one
                let savedelEktropolnilnica = await ElektropolnilnicaModel.findOneAndUpdate(
                    { id: elektropolnilnica.id }, // filter
                    elektropolnilnica, // update
                    { new: true, upsert: true } // options
                );
            }
            return res.json("Data saved");
        } catch (error) {
            console.error(error)
        }
    }
};
