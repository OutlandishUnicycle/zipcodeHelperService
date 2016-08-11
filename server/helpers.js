const fetch = require('isomorphic-fetch');
const createNewListing = require('./db/createNewListing.js');

const googleApiKey = process.env.gMapsApiKey;
const zipCodeApiKey = process.env.zipCodeApiKey;

const coordsToZip = (lat, long, res) => {
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

const compileForDb = (zip, res) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${googleApiKey}`;
  fetch(url)
  .then((res) => res.json())
  .then((jsonRes) => {
    let lat = jsonRes.results[0].geometry.location.lat;
    let lng = jsonRes.results[0].geometry.location.lng;
    let request = 'https://www.zipcodeapi.com/rest/' + zipCodeApiKey + '/radius.json/' + zip + '/20/miles';
      fetch(request)
      .then((response) => response.json())
      .then((zipcodes) => {
        let result = zipcodes.zip_codes;
        let zips = result.reduce((all, zip) => {
        	all.push(zip.zip_code);
        	return all;
        }, []);
        return zips;
      })
      .then((zips) => {
        createNewListing({
          zipcode: zip,
          nearby: zips,
          lat: lat,
          lng: lng,
        }, res);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
      }
    });
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  })
}

module.exports = {
  coordsToZip,
  zipToCoords,
  nearbyZips,
  compileForDb,
}
