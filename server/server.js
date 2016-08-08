"use strict"

const express =  require('express');
const bp = require('body-parser');

const routes = require('./routes.js');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.use('/api', routes);

app.use('/*', (req, res) => {
  console.log('wildcard!');
  res.send('you hit the wildcard!');
});

let port = process.env.PORT || 4003;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('listening on port', port);
})
