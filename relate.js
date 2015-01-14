var _ = require('underscore');
module.exports = function(cats, rules, ruleqs) {
  var fCategories = {};
  var fRules = {};
  var fRuleQs = {};
  var classifications = [];

  function checkOrAddClassification(c) {
    var index = _.indexOf(classifications, c);
    if (index !== -1) {
      return index;
    } else {
      classifications.push(c);
      return classifications.length - 1;
    }
  }

  _.each(cats, function(cat) {
    fCategories[cat.id] = {
      title: cat.title,
      rules: []
    };
  });

  _.each(rules, function(rule) {
    fRules[rule.id] = {
      title: rule.title,
      description: rule.description,
      ruleNumber: rule.id,
      classification: checkOrAddClassification(rule.classification),
      ruleQuestions: []
    };
  });
  console.log(fRules);
}
