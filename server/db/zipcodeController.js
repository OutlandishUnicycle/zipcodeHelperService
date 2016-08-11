const Zip = require('./zipModel.js');
const _h = require('../helpers.js');

module.exports = {
  checkNearbyFromZip: (zip, res) => {
    Zip.findOne({
      where: {
          zipcode: zip
        },
    })
    .then((items) => {
      if (items) {
        // if we've got it, send it
        items.src = 'mem';
        res.send(JSON.stringify(items));
      } else {
        // if not, get that data and save it, then send it
        _h.compileForDb(zip, res);
      }
    });
  },
  getAllWithNearby: () => {
    Zip.findAll({
      where: {
          nearby: {
            $not: null
          }
        },
      order: [['zipcode', 'DESC']],
    })
  },
};
