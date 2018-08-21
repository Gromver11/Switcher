import app from './app';

if (process.env.BROWSER) {
  app(window);
}

module.exports = app;
