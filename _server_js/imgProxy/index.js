var router = require('express').Router(),
    request = require('request'),
    _ = require('underscore'),
    url = require('url'),
    http = require('http');

var data = require('../data');

router.get('/:name', function(req, res) {

    request.get(data.all[req.params.name].location).pipe(res);
})
module.exports = router;
