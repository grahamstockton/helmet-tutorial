const express = require('express');
const app = express();

// helmet requirement
const helmet = require('helmet');

/*
// hide express
app.use(helmet.hidePoweredBy());

// frameguard
app.use(helmet.frameguard({action: "DENY"}));

// xss protection
app.use(helmet.xssFilter());

// avoid MIME inferring
app.use(helmet.noSniff());

// prevent IE from opening untrusted html
app.use(helmet.ieNoOpen());

// configure helmet to use HTTPS for the next 90 days
const ninetyDaysInSeconds = 90*24*60*60;
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}));

// disable DNS prefetching
app.use(helmet.dnsPrefetchControl());

// prevent client side caching
app.use(helmet.noCache());

// content security policy
app.use(helmet.contentSecurityPolicy(
  {
    directives:
      {
        defaultSrc: ["'self'"], 
        scriptSrc: ["'self'", "trusted-cdn.com"] 
      }
  }
));
*/

const ninetyDaysInSeconds = 90*24*60*60;

app.use(helmet({
  hidePoweredBy: true,
  frameguard: {
    action: 'deny'
  },
  xssFilter: true,
  noSniff: true,
  ieNoOpen: true,
  hsts: {maxAge: ninetyDaysInSeconds, force: true},
  dnsPrefetchControl: true,
  noCache: true,
  contentSecurityPolicy: {
    directives:
      {
        defaultSrc: ["'self'"], 
        scriptSrc: ["'self'", "trusted-cdn.com"] 
      }
  }
}));






































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
