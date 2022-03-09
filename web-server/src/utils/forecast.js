const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=92cd9c7e19b386dceb703d1d016b523e&query=${latitude},${longitude}&units=f`;
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const current = body.current;
            callback(undefined, `${current.weather_descriptions[0]}. It is currrently ${current.temperature}  °F and it feels like ${current.feelslike}  °F`)
        }
    })
}

module.exports = forecast;