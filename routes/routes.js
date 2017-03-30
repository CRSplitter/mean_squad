/**
 * All routes in the application.
 */
module.exports = function() {

  var express = require('express');
  var router = express.Router();

  /***************
  * Admin routes *
  ***************/
  require('./adminRoutes')(router);
};
