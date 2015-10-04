var _ = require('underscore');
var oldProofreaderActivities = require('./../v1/activities/activities.json').passageProofreadings;


var newProofreaderActivities = _.chain(oldProofreaderActivities)
  .map(function (opa, uid) {
    delete(opa.categoryId);
    delete(opa.flagId);
    delete(opa.id);
    delete(opa.rules);
    opa.description = opa.instructions;
    delete(opa.instructions);
    return [uid, opa];
  })
  .object()
  .value();

require('./../write.js')(newProofreaderActivities, __dirname + '/proofreaderActivities.json');
