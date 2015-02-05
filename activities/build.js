module.exports = function(
  sentenceWritings
) {
  var base = {
    sentenceWritings: sentenceWritings
  };

  require('../print')(base);
}
