module.exports = require('express').Router();
module.exports.planechase =  require('./planechase');
module.exports.archenemy =  require('./archenemy');

module.exports.use('/planechase',module.exports.planechase);
module.exports.use('/archenemy',module.exports.archenemy);
