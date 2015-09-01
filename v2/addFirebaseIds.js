var _ = require('underscore');

var fbId = require('./firebase-tools/generate-pushid');

module.exports = function(conceptsWithQuestions) {
  return _.chain(conceptsWithQuestions)
    .map(function(c) {
      return [fbId(), c];
    })
    .object()
    .value()
};
