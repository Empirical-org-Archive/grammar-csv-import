var _ = require('underscore');
module.exports = function(r, rq) {
  return _.chain(r)
    .map(function(rule) {
      rule.ruleQuestions = _.map(rule.ruleQuestions, function(v, k) {
        var foundRuleQuestion = rq[k];
        foundRuleQuestion.id = k;
        return foundRuleQuestion;
      });
      return rule;
    })
    .value();
};
