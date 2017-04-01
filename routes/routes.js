/**
 * All routes in the application.
 */
module.exports = function(app) {

  /***************
  * Admin routes *
  ***************/
  require('./adminRoutes')(app);

  /******************
  * Business routes *
  *******************/
  require('./businessRoutes')(app);

  /***************************
  * Business Operator routes *
  ****************************/
  require('./businessOperatorRoutes')(app);
};
