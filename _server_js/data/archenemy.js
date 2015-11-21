var router = require('express').Router(),
    _ = require('underscore');

var schemes = require('./data_files/archenemy');


router.get('/', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(schemes);
});

router.get('/:name', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  if(_.has(schemes,req.params.name)){
    res.send(schemes[req.params.name]);
  }
  else{
    res.sendStatus(404)
  }
});

module.exports = router;
module.exports.archenemy = schemes;
