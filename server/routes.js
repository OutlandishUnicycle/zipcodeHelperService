const router = require('express').Router();

const _h = require('./helpers');

router.get('/', (req, res) => {
  res.send('this is the base of the api route. Nothing really happens here... But welcome!');
});

// will return the zipcode associated with a lat, lng pair
router.get('/zip', (req, res) => {
  let lat = req.query.lat;
  let lng = req.query.lng;
  _h.coordsToZip(lat, lng, res);
});

// will return the lat, lng pair associated with a zipcode
router.get('/coords', (req, res) => {
  let zip = req.query.zip;
  _h.zipToCoords(zip, res);
});

// will return the all zipcodes within 25 miles of the given zipcode
router.get('/nearby', (req, res) => {
  let zip = req.query.zip;
  _h.nearbyZips(zip, res);
});

// send in a zipcode and get a state
router.get('/state', (req, res) => {
  let zip = req.query.zip;
  _h.zipToState(zip, res);
})

module.exports = router;
