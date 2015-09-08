var _ = require('underscore');
module.exports = function(ruleQuestions, concepts) {
  return _.map(ruleQuestions, function(rq, i) {
    var concept = _.findWhere(concepts, {ruleQuestionNumber: Number(i)});
    rq.concept_level_2 = concept.concept_level_2;
    rq.concept_level_1 = concept.concept_level_1;
    rq.concept_level_0 = concept.concept_level_0;
    return rq;
  });
}
