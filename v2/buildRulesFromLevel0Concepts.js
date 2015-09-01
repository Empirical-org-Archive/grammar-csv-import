var _ = require('underscore');

module.exports = function(rules, ruleQuestionMap) {
  var concept_level_0s =
    _.chain(ruleQuestionMap)
      .map(function (rwn) {
        console.log(rwn);
        return rwn.concept_level_0;
      })
      .value();
  var rulesWithTitlesAndNumber = _.map(rules, function(r) {
    return {
      ruleNumber: r.ruleNumber,
      title: r.title.replace('Practice: ', '')
    };
  });
  var concept0sWithoutRule = _.filter(concept_level_0s, function(c) {
    return _.find(rulesWithTitlesAndNumber, function(r) {
      return r.title === c;
    });
  });
  var currentMax = _.max(rules, function(r) {
    return r.ruleNumber;
  });
  console.log(concept0sWithoutRule.length);
  return rules;
};
