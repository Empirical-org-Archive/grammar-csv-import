var _ = require('underscore');
module.exports = function(cats, rules, ruleQs) {
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
    var rest = _.rest(lines).join('\n').split('-');
    return _.map(rest, function(r) {
      return r.split();
    });
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
    fRuleQs[q.id] = {
      instructions: checkOrAddInstructions(q.instructions),
      prompt: q.prompt,
      body: _.extend({}, parseYamlList(q.body)),
      hint: q.hint || ""
    };

    if (q.ruleId) {
      fRules[q.ruleId].ruleQuestions[q.id] = true;
    }

  });
  require('build')(
    fCategories,
    fRules,
    fRuleQs,
    _.extend({}, classifications),
    _.extend({}, instructions)
  );
}
