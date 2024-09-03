const app = require('./app');

if (window) {
  app(window);
}

module.exports = app;
