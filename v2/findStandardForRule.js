var _ = require('underscore');

var categories = require('./../v1/cms/cms.json').categories;
module.exports = function(rule) {
  var ruleId = rule.ruleNumber;
  var category = _.findWhere(categories, function(c) {
    return _.findWhere(c.rules, function(v, id) {
      return String(id) === String(ruleId);
    });
  });
  return category.title;
};
