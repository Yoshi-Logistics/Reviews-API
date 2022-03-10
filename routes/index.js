const reviews = require('./reviews');
const metadata = require('./metadata');
const helpful = require('./helpful');
const report = require('./report');

module.exports = (app) => {
  app.use('/reviews', reviews);
  // app.use('/reviews', metadata);
  app.use('/reviews', helpful);
  app.use('/reviews', report);
};
