var _ = require('underscore');
module.exports = function(
  sentenceWritings
) {
  var base = {
    sentenceWritings: sentenceWritings
  };

  console.log(JSON.stringify(base));
}
