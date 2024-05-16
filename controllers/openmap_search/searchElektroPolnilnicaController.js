var ElektropolnilnicaModel = require('../../models/openmap_search/searchElektroPolnilnicaModel.js');
var RealPolnilnica = require('../../models/polnilnice/elektroPolnilnicaModel.js')

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
            let result = ElektropolnilnicaModel.getFromJson(data[0]);
            return res.json(RealPolnilnica.getFromSearchPolnilnica(result));
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
                let result = ElektropolnilnicaModel.getFromJson(item);

                // console.log(result);
                console.log(result._id);
                // find if exists RealPolnilnica with same id
                RealPolnilnica.findOne({
                    _id: result._id
                }, function (err, polnilnica) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json(err);
                    }

                    if (!polnilnica){
                        console.log("Not found - creating new one");
                        RealPolnilnica.create(result, function (err, connection) {
                            if (err) {
                                console.error(err);
                                return res.status(500).json(err);
                            }
                        });
                    }else{
                        console.log("Updating");
                    }
                });
                return res.json("Data saved");
            }
        } catch (error) {
            console.error(error)
        }
    }
};
