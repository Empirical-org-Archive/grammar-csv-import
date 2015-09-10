var _ = require('underscore');
module.exports = function(rules, ruleQuestions, concepts) {

  function findRuleQuestionWithConcept(c) {
    return _.find(ruleQuestions, function(rq, i) {
      return Number(i) === c.ruleQuestionNumber;
    });
  }

  var questions = _.map(concepts, function(c) {
    c.ruleQuestions = JSON.parse(
      c.ruleQuestions
        .replace(/""/g, '"')
        .replace(/\\{2,}"\\\\"/g, '\\"')
        .replace(/\\{1,}r\\{1,}n/g, '')
    );
    var buddy = findRuleQuestionWithConcept(c);
    console.log(buddy.prompt, c.ruleQuestions);
    return buddy;
  });
};
