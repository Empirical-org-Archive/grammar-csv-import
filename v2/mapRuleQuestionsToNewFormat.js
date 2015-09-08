var _ = require('underscore');
module.exports = function(rulesWithNestedRuleQuestions) {
  return _.map(rulesWithNestedRuleQuestions, function(rwnrq) {
    var r = rwnrq;
    r.questions = _.map(r.questions, function(rq) {
      rq.ruleQuestionId = rq.id;
      rq.ruleId = r.ruleNumber;
      rq.instructions = require('./mapInstructionsBackIntoRuleQuestion')(rq);
      return _.omit(rq, [
        'conceptCategory',
        'conceptClass',
        'conceptId',
        'conceptTag',
        'id'
      ]);
    });
    return r;
  });
};
