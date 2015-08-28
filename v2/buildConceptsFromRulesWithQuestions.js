var _ = require('underscore');

module.exports = function (rules, ruleQuestionsMap) {
  return _.chain(rules)
    .map(function (r) {
      var rqs = _.filter(ruleQuestionsMap, function(rq) {
        return Number(rq.ruleId) === Number(r.ruleNumber);
      });
      delete(r.ruleQuestions);
      r.questions = rqs;
      return r;
    })
    .value();
}
