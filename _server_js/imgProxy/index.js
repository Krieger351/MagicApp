var router = require('express').Router(),
    request = require('request'),
    _ = require('underscore'),
    url = require('url'),
    http = require('http');

var data = require('../data');

router.get('/:name', function(req, res) {
  //console.log(_.extend(data.planechase.all,data.archenemy.schemes)[req.params.name].location);
  //console.log(request.get(_.extend(data.planechase.all,data.archenemy.schemes)[req.params.name].location))
  var img = request.get(_.extend(data.planechase.all,data.archenemy.schemes)[req.params.name].location)
  req.pipe(img);
  img.pipe(res);
})
module.exports = router;
