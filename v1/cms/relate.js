var _ = require('underscore');
module.exports = function(cats, rules, ruleQs, ruleQuestionConcepts, ruleQuestionConceptIdTable) {
  var fCategories = {};
  var fRules = {};
  var fRuleQs = {};
  var classifications = [];
  var instructions = [];

  function checkOrAdd(a, c) {
    var index = _.indexOf(a, c);
    if (index !== -1) {
      return index;
    } else {
      a.push(c);
      return a.length - 1;
    }
  }

  function checkOrAddInstructions(i) {
    return checkOrAdd(instructions, i);
  }

  function checkOrAddClassification(c) {
    return checkOrAdd(classifications, c);
  }

  function parseYamlList(y) {
    var lines = y.split('\n');
    if (lines[0] !== '---') {
      throw new Error("We are highly assuming this a yaml list");
    }
    var rest = _.rest(lines).join('\n').split('- ');
    return _.filter(_.map(rest, function(r) {
      return r.trim();
    }, function(w) {
      return w !== '';
    }));
  }

  function findConceptIdByRuleQuestionId(ruleQuestionId) {
    var record = _.findWhere(ruleQuestionConceptIdTable, {rule_question_id: ruleQuestionId});
    if (record) {
      return record.concept_id;
    }
  }

  _.each(cats, function(cat) {
    fCategories[cat.id] = {
      title: cat.title,
      rules: {}
    };
  });

  _.each(rules, function(rule) {
    fRules[rule.id] = {
      title: rule.title,
      description: rule.description,
      ruleNumber: rule.id,
      classification: checkOrAddClassification(rule.classification),
      ruleQuestions: {}
    };
    if (rule.categoryId) {
      fCategories[rule.categoryId].rules[rule.id] = true;
    }
  });

  _.each(ruleQs, function(q) {
    var rqc = _.findWhere(ruleQuestionConcepts, {id: q.id})
    if (rqc.Concept_Category && rqc.Concept_Class) {
      fRuleQs[q.id] = {
        instructions: checkOrAddInstructions(q.instructions),
        conceptTag: rqc.Concept_Tag,
        conceptCategory: rqc.Concept_Category,
        conceptClass: rqc.Concept_Class,
        conceptId: findConceptIdByRuleQuestionId(q.id),
        prompt: q.prompt,
        body: _.extend({}, parseYamlList(q.body)),
        hint: q.hint || ""
      };

      if (q.ruleId) {
        fRules[q.ruleId].ruleQuestions[q.id] = true;
      }
    }
  });
  require('./build')(
    fCategories,
    fRules,
    fRuleQs,
    _.extend({}, classifications),
    _.extend({}, instructions)
  );
}
