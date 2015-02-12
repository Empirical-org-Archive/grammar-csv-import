module.exports = function(
  sentenceWritings, passageProofreadings
) {
  var base = {
    sentenceWritings: sentenceWritings,
    passageProofreadings: passageProofreadings,
  };

  require('../print')(base);
}
