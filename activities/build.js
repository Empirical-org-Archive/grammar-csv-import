var migrateIds = require('./migrateIds');
module.exports = function(
  sentenceWritings, passageProofreadings
) {
  passageProofreadings = migrateIds(passageProofreadings);
  var base = {
    sentenceWritings: sentenceWritings,
    passageProofreadings: passageProofreadings,
  };

  require('../print')(base);
}
