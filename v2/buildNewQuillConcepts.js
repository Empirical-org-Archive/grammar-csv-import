var _ = require('underscore');
module.exports = function(rules, ruleQuestions, concepts) {

  function findRuleQuestionWithConcept(c) {
    return _.find(ruleQuestions, function(rq, i) {
      return Number(i) === c.ruleQuestionNumber;
    });
  }

  var missingBuddy = [];
  var questions = _.map(concepts, function(c) {
    c.ruleQuestions = JSON.parse(
      c.ruleQuestions
        .replace(/""/g, '"')
        .replace(/\\{2,}"\\\\"/g, '\\"')
        .replace(/\\{1,}r\\{1,}n/g, '')
    );
    var buddy = findRuleQuestionWithConcept(c);
    if (!buddy) {
      missingBuddy.push(c);
    } else {
      c.instructions = require('./findInstructionById')(buddy.instructions);
      c.prompt = buddy.prompt;
    }
    c.answers = c.ruleQuestions;
    delete(c.ruleQuestions);
    delete(c.ruleQuestionNumber);
    delete(c.conceptClass);
    return c;
  });

  var groupedByConceptChain = _.groupBy(questions, function(q) {
    return q.concept_level_2 + '|' + q.concept_level_1 + '|' + q.concept_level_0;
  });
};
