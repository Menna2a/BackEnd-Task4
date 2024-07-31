const request = require("request")
function geocode(address, callback) {
    const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/ " + address + ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"
    request({ url: geocodeurl, json: true }, (error, response) => {
        if (error) {
            callback("Low Level Error Has Occurred", undefined)

        }
        else if (response.body.message) {
            callback(response.body.message, undefined)

        } else if (response.body.features.length == 0) {
            callback("unable to find location", undefined)

        }
        else {

            callback(undefined, {

                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })


        }
    })
}
module.exports = geocode