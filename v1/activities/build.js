var migratePFQuestions = require('./migratePFQuestions.js');
module.exports = function(
  sentenceWritings, passageProofreadings
) {
  passageProofreadings = migratePFQuestions(passageProofreadings);
  var base = {
    sentenceWritings: sentenceWritings,
    passageProofreadings: passageProofreadings,
  };

  require('../print')(base);
}
