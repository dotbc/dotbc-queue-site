const config = require('cconfig')();

module.exports = function () {

  return function (req, res, next) {
	
      var isHttps = req.secure;

      if ( ! isHttps) {
        isHttps = ((req.headers["x-forwarded-proto"] || '').substring(0,5) === 'https');
      }

      if (isHttps) {
        next();
      } else {
        // Only redirect GET methods
        if (req.method === "GET" || req.method === 'HEAD') {
          var host = req.headers.host;
          res.redirect(301, "https://" + config.HOSTNAME);
        } else {
          res.status(403).send("Please use HTTPS when submitting data to this server.");
        }
      }
    }
    
}