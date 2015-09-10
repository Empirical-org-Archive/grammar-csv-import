var _ = require('underscore');
module.exports = function(rules, ruleQuestions, concepts) {

  function findRuleQuestionWithConcept(c) {
    return _.find(ruleQuestions, function(rq, i) {
      return Number(i) === c.ruleQuestionNumber;
    });
  }

  function findByRuleTitle(rt) {
    var rs = _.filter(rules, function(r) {
      return r.title === rt;
    });
    var max = _.max(rs, function(r) {
      return r.ruleNumber;
    });
    if (max !== -Infinity) {
      return max.ruleNumber;
    } else {
      return 0;
    }
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
    c.answers = _.chain(c.ruleQuestions)
      .map(function(v, i) {
        return [i, {text: v}];
      })
      .object()
      .value();
    delete(c.ruleQuestions);
    delete(c.ruleQuestionNumber);
    delete(c.conceptClass);
    return c;
  });

  var groupedByConceptChain = _.groupBy(questions, function(q) {
    return q.concept_level_2 + '|' + q.concept_level_1 + '|' + q.concept_level_0;
  });

  var newRules = _.map(groupedByConceptChain, function(chain) {
    if (chain.length > 0) {
      var exConcept = chain[0];
      return {
        concept_level_0: exConcept.concept_level_0,
        concept_level_1: exConcept.concept_level_1,
        concept_level_2: exConcept.concept_level_2,
        ruleNumber: findByRuleTitle(exConcept.oldRuleName),
        questions: _.map(chain, function(c) {
          return _.omit(c, [
            'concept_level_0',
            'concept_level_1',
            'concept_level_2',
            'oldRuleName',
          ]);
        })
      };
    } else {
      return {};
    }
  });
  return newRules;
};
