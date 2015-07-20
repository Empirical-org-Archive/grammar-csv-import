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
    .map(function(r) {
      if (!r.ruleQuestions) {
        r.ruleQuestions = {};
      }
      return [r.ruleNumber, r];
    })
    .object()
    .value();


  base.flags = ['Production', 'Beta', 'Alpha', 'Archived'];

  require(__dirname + './../../print')(base);
}
