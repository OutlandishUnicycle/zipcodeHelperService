const fetch = require('isomorphic-fetch');
// const secret = require('../secret.js')

const googleApiKey = process.env.gMapsApiKey || secret.googleGeocodingApiKey;
const zipCodeApiKey = process.env.zipCodeApiKey || secret.zipCodeApiKey;


const coordsToZip = (lat, long, res) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=postal_code|administrative_area_level_1&key=${googleApiKey}`;
  fetch(url)
  .then((res) => res.json())
  .then((jsonRes) => {
    let zip = jsonRes.results[0].address_components[0].long_name;
    let state = jsonRes.results[1].address_components[0].short_name;
    console.log(zip,state);

    res.send(zip+'#'+state);
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  })
};

const zipToCoords = (zip, res) => {
  // the purpose of this function is to convert a zipcode into the lat and long associated with it's home
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${googleApiKey}`;
  fetch(url)
  .then((res) => res.json())
  .then((jsonRes) => {
    let lat = jsonRes.results[0].geometry.location.lat;
    let lng = jsonRes.results[0].geometry.location.lng;
    res.send(JSON.stringify({lat, lng}));
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  })
};

const nearbyZips = (zip, res) => {
  let request = 'https://www.zipcodeapi.com/rest/' + zipCodeApiKey + '/radius.json/' + zip + '/20/miles';
    fetch(request)
    .then((response) => response.json())
    .then((zipcodes) => {
      let result = zipcodes.zip_codes;
      let zips = result.reduce((all, zip) => {
      	all.push(zip.zip_code);
      	return all;
      }, []);
      console.log(zips);
      // res.send(zips);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
    }
  });
};
const zipToState = (zip, res) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${googleApiKey}`;
  fetch(url)
  .then((res) => res.json())
  .then((jsonRes) => {
    let resultsObj = jsonRes.results[0].address_components;
    let state = resultsObj[resultsObj.length-2].short_name;
    res.send(JSON.stringify({stateUSA: state}));
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  })
};

module.exports = {
  coordsToZip,
  zipToCoords,
  nearbyZips,
  zipToState,
}
