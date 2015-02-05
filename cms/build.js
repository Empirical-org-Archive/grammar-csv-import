var _ = require('underscore');
module.exports = function(
  categories,
  rules,
  ruleQs,
  classifications,
  instructions
) {
  function getMaxId(obj) {
    return _.max(_.map(_.keys(obj), function(n) {return Number(n);}));
  }
  var base = {
    categories: categories,
    rules: rules,
    ruleQuestions: ruleQs,
    classifications: classifications,
    instructions: instructions,
    ruleNumberCounter: getMaxId(rules)
  };

  require('../print')(base);
}
