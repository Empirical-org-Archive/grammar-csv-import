var _ = require('underscore');
var fs = require('fs');
var passagesWithUnderlines = require('./pfs-with-underlines.json');

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
    .map(function MigrateIds(pfs, key) {
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
    .map(function stripParens(pfs, key) {
      var passage = String(pfs.passage);
      passage.replace(regex, function(key,p,m,ruleNumber) {
        var minus = m.replace(/\(/g, '').replace(/\)/g, '');
        passage = passage.replace(key, key.replace(m, minus));
      });
      pfs.passage = passage;
      return [key, pfs];
    })
    .object()
    .map(function addUnderlineDefaultSwitchFalse(pfs, key) {
      pfs.underlineErrorsInProofreader = _.contains(passagesWithUnderlines, key);
      return [key, pfs];
    })
    .object()
    .value();
}
