const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        try {
            if (body.status === 'ZERO_RESULTS') {
                callback('Unable to find that address.');
            } else if (body.status === 'OK') {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        } catch(error) {
            callback('Unable to connect to Google servers.');
        }
    });
};

module.exports = {
  geocodeAddress: geocodeAddress
};