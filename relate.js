var _ = require('underscore');
module.exports = function(cats, rules, ruleqs) {
  var fCategories = {};
  var fRules = {};
  var fRuleQs = {};

  _.each(cats, function(cat) {
    fCategories[cat.id] = {
      title: cat.title
    };
  });
}
