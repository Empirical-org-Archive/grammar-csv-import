var _ = require('underscore');
module.exports = function(rulesWithNestedRuleQuestions) {
  var rqs = [];
  _.each(rulesWithNestedRuleQuestions, function(rwnrq) {
    var r = rwnrq;
    _.map(r.ruleQuestions, function(rq) {
      rq.ruleQuestionId = rq.id;
      rq.ruleId = r.ruleNumber;
      rq.concept_level_2 = rq.conceptClass;
      rq.concept_level_1 = rq.conceptCategory;
      rq.concept_level_0 = rq.conceptTag;
      rqs.push(_.omit(rq, [
        'conceptCategory',
        'conceptClass',
        'conceptId',
        'conceptTag',
        'id'
      ]));
    });
  });
  return rqs;
};
