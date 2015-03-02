var rqs = require('./../cms/cms.json').ruleQuestions;
var _ = require('underscore');

if (!rqs) {
  throw new Error('What happened to the rule questions');
}
var exK = _.first(_.keys(rqs));
var exR = _.union(_.keys(rqs[exK]), ['id']);

require('json2csv')({
  data: _.map(rqs, function(v, k) {
    v.id = k;
    return v;
  }),
  fields: exR
}, function(err, csv) {
  console.log(csv);
});
