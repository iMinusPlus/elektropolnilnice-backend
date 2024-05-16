var ElektropolnilnicaOpenChargeModel = require('../../models/openmap_search/searchElektroPolnilnicaModel.js');
var ElektropolnilnicaModel = require('../../models/polnilnice/elektroPolnilnicaModel.js')

module.exports = {
    testOpenCharge: async function (req, res) {
        const url = new URL("https://api.openchargemap.io/v3/poi/?output=json&countrycode=SI&latitude=46.5547&longitude=15.6459&maxresults=100&distance=25&key=50062ab3-b707-4dea-9da7-c8611695a9ff");
        // const url = new URL("https://api.openchargemap.io/v3/poi/?output=json&countrycode=SI&maxresults=1&key=50062ab3-b707-4dea-9da7-c8611695a9ff"); //todo potem spremeniti in sestaviti po pravilih
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong" + response.statusText);
            }
            const data = await response.json();
            // return res.json(data);
            let result = ElektropolnilnicaOpenChargeModel.getFromJson(data[0]);
            return res.json(ElektropolnilnicaModel.getFromSearchPolnilnica(result));
        } catch (error) {
            console.error(error)
        }
    },

    saveOpenChargeData: async function (req, res) {
        const url = new URL("https://api.openchargemap.io/v3/poi/?output=json&countrycode=SI&latitude=46.5547&longitude=15.6459&maxresults=100&distance=25&key=50062ab3-b707-4dea-9da7-c8611695a9ff");
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong" + response.statusText);
            }
            const data = await response.json();
            for (const item of data) {
                // print number of the item (each step)
                console.log(data.indexOf(item));
                // if (item === null) break;
                let result = ElektropolnilnicaOpenChargeModel.getFromJson(item);


                // find if exists RealPolnilnica with same id
                try {
                    var polnilnica = await ElektropolnilnicaModel.findOne({UUID: result.UUID});

                    if (polnilnica !== null) {
                        console.log("Updating");
                        // update polnilnica so it updates ElektropolnilnicaModel
                        // try {
                        //     ElektropolnilnicaModel.updateOne({UUID: result.UUID}, result, function (err, connection) {
                        //         if (err) {
                        //             console.error(err);
                        //             return res.status(500).json(err);
                        //         }
                        //     });
                        // } catch (err) {
                        //     console.log("Error in updating polnilnica")
                        //     console.error(err);
                        //     return res.status(500).json(err);
                        // }
                    } else {
                        console.log("Creating");
                        ElektropolnilnicaModel.create(result, function (err, connection) {
                            if (err) {
                                console.error(err);
                                return res.status(500).json(err);
                            }
                        });
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
