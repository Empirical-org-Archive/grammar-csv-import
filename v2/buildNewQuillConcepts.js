var _ = require('underscore');
module.exports = function(rules, ruleQuestions, concepts) {

  function findRuleQuestionWithConcept(c) {
    return _.find(ruleQuestions, function(rq, i) {
      return Number(i) === c.ruleQuestionNumber;
    });
  }

  var questions = _.map(concepts, function(c) {
    var buddy = findRuleQuestionWithConcept(c);
    console.log(buddy.prompt, c.ruleQuestions);
    return buddy;
  });
};
