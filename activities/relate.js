var _ = require('underscore');
var hstore = require('hstore.js');
var yaml = require('js-yaml');
module.exports = function(activities) {

  var flags = [{id:1, name: '{production}'}, {id:2, name: '{beta}'},
    {id:3, name: '{alpha}'}, {id:4, name:'{archived}'}
  ];

  function makeRules(s) {
    try {
      var rules = hstore.parse(s).rule_position;
      var f = rules.split('\r\n').join(('\n'));
      rules = yaml.load(f);
      return rules;
    } catch (e) {
      return null;
    }
  }


  var sentenceWritings = _.chain(_.groupBy(activities, 'activity_classification_id')[2])
    .map(function(n) {
      return {
        categoryId: n.topic_id,
        description: n.description,
        flags: n.flags,
        data: n.data,
        title: n.name,
      };
    })
    .map(function(f) {
      f.flagId = _.findWhere(flags, {name: f.flags}).id;
      delete(f.flags);
      return f;
    })
    .map(function(d) {
      d.rules = makeRules(d.data);
      delete(d.data);
      return d;
    })
    .value();
  require('build')(
    _.extend({}, sentenceWritings)
  );
}
