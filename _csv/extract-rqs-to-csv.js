var rqs = require('./../cms/cms.json').ruleQuestions;
var rules = require('./../cms/cms.json').rules;
var _ = require('underscore');

if (!rqs || !rules) {
  throw new Error('What happened to the rule questions');
}
var exR = ['ruleQuestionId', 'body', 'prompt'];
var ruleIndex = _.chain(rules)
  .map(function(v, key) {
    return _.map(v.ruleQuestions, function(v, rqi) {
      return [rqi, key];
    })
  })
  .flatten(1)
  .object()
  .value();
rqs =_.map(rqs, function(v, k) {
  v.ruleQuestionId = k;
  v.body = JSON.stringify(v.body);
  return v;
})

require('json2csv')({
  data: rqs,
  fields: exR
}, function(err, csv) {
  console.log(csv);
});
