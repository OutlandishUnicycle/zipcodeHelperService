const Zip = require('./zipModel.js');
const _h = require('../helpers.js');

const createNewListing = (src, res) => {
  Zip.create({
    zipcode: src.zipcode,
    nearby: JSON.stringify(src.nearby),
    lat: src.lat,
    lng: src.lng,
  })
  .then((list) => {
    list.src = 'api';
    res.send(JSON.stringify(list));
  })
};

module.exports = createNewListing;
