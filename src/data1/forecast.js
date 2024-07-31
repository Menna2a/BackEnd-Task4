const request = require("request")
const forecast = (latitude, longitude, callback) => {

    const url = "https://api.weatherapi.com/v1/current.json?key=0b7a9dccf5544fd3a81202131241707&q=" + latitude + "," + longitude
    request({ url, json: true }, (error, response) => {


        if (error) {
            callback("Low Level Error Has Occurred", undefined)
        } else if (response.body.error) {
            callback(response.body.error.message, undefined)
        } else {
            callback(undefined, response.body.location.name + " is " + response.body.current.condition.text + " | Temp of= " + response.body.current.temp_c)

        }

    })
}
module.exports = forecast
