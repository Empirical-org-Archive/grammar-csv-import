var _ = require('underscore');

module.exports = function(r) {
  return _.map(r, function(rule) {
    return {
      title: rule.title,
      ruleNumber: rule.ruleNumber
    };
  });
}
