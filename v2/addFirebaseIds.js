var _ = require('underscore');

var fbId = require('./firebase-tools/generate-pushid');

module.exports = function(conceptsWithQuestions) {
  return _.chain(conceptsWithQuestions)
    .map(function(c) {
      c.questions = _.chain(c.questions)
        .map(function(q) {
          return [fbId(), q];
        })
        .object()
        .value();
      return [fbId(), c];
    })
    .object()
    .value()
};
