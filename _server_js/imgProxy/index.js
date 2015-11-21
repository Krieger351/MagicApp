var router = require('express').Router(),
    request = require('request'),
    _ = require('underscore'),
    url = require('url'),
    http = require('http');

var data = require('../data');

router.get('/:name', function(req, res) {
    request.get(_.extend(data.planechase.all,data.archenemy.schemes)[req.params.name].location).pipe(res);
})
module.exports = router;
