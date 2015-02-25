var _ = require('underscore');
var fs = require('fs');

var regex = /{\+([^-]+)-([^|]+)\|([^}]+)}/g;

module.exports = function(pfs) {
  var mapping = _.chain(fs.readFileSync('./updated_story_rules').toString().split('\n'))
    .filter(function(f) {
      return f !== "";
    })
    .map(function(es) {
      return es.split('=')
    })
    .object()
    .value();
  return _.chain(pfs)
    .map(function(pfs, key) {
      var passage = pfs.passage;
      passage.replace(regex, function(key,b,c,ruleNumber) {
        if (mapping[ruleNumber]) {
          passage = passage.replace(key, key.replace(ruleNumber, mapping[ruleNumber]));
        }
      });
      pfs.passage = passage;
      return [key, pfs];
    })
    .object()
    .value();
}
