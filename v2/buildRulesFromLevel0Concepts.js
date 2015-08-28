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
  console.log(rulesWithTitlesAndNumber);
  return concept_level_0s;
};
