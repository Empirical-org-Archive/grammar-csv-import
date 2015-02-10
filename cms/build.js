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

  base.rules = _.filter(base.rules, function(r) {
    return r.ruleQuestions && _.size(r.ruleQuestions) > 0;
  });

  var ruleIdsAfterFilter = _.map(_.pluck(base.rules, 'ruleNumber'), String);

  base.categories = _.map(base.categories, function(c) {
    c.rules = _.chain(c.rules)
      .keys()
      .filter(function(k) {
        return _.contains(ruleIdsAfterFilter, k);
      })
      .map(function(k) {
        return [k, true];
      })
      .object()
      .value();
    return c;
  });


  require('../print')(base);
}
