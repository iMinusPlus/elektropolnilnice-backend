var ElektropolnilnicaModel = require('../../models/openmap_search/searchElektroPolnilnicaModel.js');
var RealPolnilnica = require('../../models/polnilnice/elektroPolnilnicaModel.js')

module.exports = {
    testOpenCharge: async function (req, res) {
        const url = new URL("https://api.openchargemap.io/v3/poi/?output=json&countrycode=SI&maxresults=1&key=50062ab3-b707-4dea-9da7-c8611695a9ff"); //todo potem spremeniti in sestaviti po pravilih
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong" + response.statusText);
            }
            const data = await response.json();

            result = ElektropolnilnicaModel.getFromJson(data[0]);
            return res.json(RealPolnilnica.getFromSearchPolnilnica(result));
        } catch (error) {
            console.error(error)
        }
    },
};
