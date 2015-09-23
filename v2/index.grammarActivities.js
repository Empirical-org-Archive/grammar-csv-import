var _ = require('underscore');

var concepts = require(__dirname + '/./concepts.json');
var oldGrammarActivities = require('./../v1/activities/activities.json').sentenceWritings;

function createConceptList(rules) {
  return rules;
}


var newGrammarActivities = _.chain(oldGrammarActivities)
  .map(function (oga, uid) {
    delete(oga.categoryId);
    delete(oga.flagId);
    oga.concepts = createConceptList(oga.rules);
    delete(oga.rules);
    return [uid, oga];
  })
  .object()
  .value();

console.log(newGrammarActivities);

