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

  base.rules = _.chain(base.rules)
    .filter(function(r) {
      return r.ruleQuestions && _.size(r.ruleQuestions) > 0;
    })
    .map(function(r) {
      return [r.ruleNumber, r];
    })
    .object()
    .value();


  base.flags = ['Production', 'Beta', 'Alpha', 'Archived'];

  require('../print')(base);
}
