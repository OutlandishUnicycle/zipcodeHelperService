const fetch = require('isomorphic-fetch');

const googleApiKey = process.env.gMapsApiKey;
const zipCodeApiKey = process.env.zipCodeApiKey;

const coordsToZip = (lat, long, res) => {
  // the purpose of this function is to convert a lat and long into a zipcode
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=postal_code&key=${googleApiKey}`;
  fetch(url)
  .then((res) => res.json())
  .then((jsonRes) => {
    let zip = jsonRes.results[0].address_components[0].long_name;
    res.send(zip);
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
      res.send(zips);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
    }
  });
};

module.exports = {
  coordsToZip,
  zipToCoords,
  nearbyZips
}
