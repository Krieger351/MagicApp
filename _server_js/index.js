var settings = require('./settings'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();
var data = require('./data'),
    img = require('./imgProxy');

app.use(express.static(path.normalize(__dirname + settings.static_path)));
app.use(bodyParser.json());

app.use('/data',data);
app.use('/img',img);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
