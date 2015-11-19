var router = require('express').Router(),
    _ = require('underscore');

var planes = require('./planes')
    phenomenon = require('./phenomenon'),
    all = _.extend(planes,phenomenon);


router.get('/planes', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(planes);
});
router.get('/phenomenon', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(phenomenon);
});
router.get('/', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(all);
});

router.get('/:name', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  if(_.has(all,req.params.name)){
    res.send(all[req.params.name]);
  }
  else{
    res.sendStatus(404)
  }
});

module.exports = router;
module.exports.planes = planes;
module.exports.phenomenon = phenomenon;
module.exports.all = all;
