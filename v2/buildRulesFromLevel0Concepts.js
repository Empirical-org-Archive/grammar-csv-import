var _ = require('underscore');

module.exports = function(rules, ruleQuestionMap) {
  var concept_level_0s = 
    _.chain(ruleQuestionMap)
      .map(function (rwn) {
        return rwn.concept_level_0;
      })
      .uniq()
      .value();
  var rulesWithTitlesAndNumber = _.map(rules, function(r) {
    return {
      ruleNumber: r.ruleNumber,
      title: r.title
    };
  });
  var concept0sWithoutRule = _.filter(concept_level_0s, function(c) {
    return _.find(rulesWithTitlesAndNumber, function(r) {
      return r.title === c;
    });
  });
  return concept_level_0s;
};
