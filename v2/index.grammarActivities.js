var _ = require('underscore');

var concepts = require(__dirname + '/./concepts.json');
var oldGrammarActivities = require('./../v1/activities/activities.json').sentenceWritings;

function findConceptUid(rn, index) {
  var conceptKey = _.findKey(concepts, {ruleNumber: Number(rn)});
  if (conceptKey) {
    return conceptKey;
  } else {
    return 'needKey' + index;
  }
}

function createConceptList(rules) {
  return _.chain(rules)
    .map(function (r, index) {
      return [findConceptUid(r.ruleId, index), r];
    })
    .object()
    .value();
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

