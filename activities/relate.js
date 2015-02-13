var _ = require('underscore');
var hstore = require('hstore.js');
var yaml = require('js-yaml');
var yaml2 = require('yaml2');
module.exports = function(activities, proofData) {

  var flags = [{id:1, name: '{production}'}, {id:2, name: '{beta}'},
    {id:3, name: '{alpha}'}, {id:4, name:'{archived}'}
  ];

  function makeRules(s) {
    try {
      var rules = hstore.parse(s).rule_position;
      rules = yaml.load(rules);
      rules = yaml2.eval(rules);
      if (typeof(rules) === 'object') {
        var isOneElement = rules.length === 1 && typeof(rules[0]) !== 'object';
        var isNotPaired = _.flatten(rules).length === rules.length;
        if (isOneElement || isNotPaired) {
          return _.map(rules, function(r) {
            return {
              ruleId: r,
              quantity: 1
            }
          });
        } else {
          return _.chain(rules)
            .flatten()
            .groupBy(function(e, index) {
              return Math.floor(index/2);
            })
            .toArray()
            .map(function(p) {
              return {
                ruleId: p[0],
                quantity: p[1]
              };
            })
            .value();
        }
      } else {
        return null;
      }
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
        title: n.name.replace('Sentence Writing: ', ''),
      };
    })
    .map(function(f) {
      f.flagId = _.findWhere(flags, {name: f.flags}).id;
      delete(f.flags);
      return f;
    })
    .reject(function(f) {
      var archived = _.findWhere(flags, {name: '{archived}'}).id;
      return f.flagId === archived;
    })
    .map(function(d) {
      d.rules = _.extend({}, makeRules(d.data));
      delete(d.data);
      return d;
    })
    .value();

  function parseYaml(d) {
    var r = d
      .replace('---', '')
      .replace(/\\""/g, '"')
      .replace('\n...', '')
      .trim();
    while (_.last(r) === '"') {
      r = _.first(r, r.length -1).join('');
    }
    while (_.first(r) === '"') {
      r = _.rest(r).join('');
    }
    return r.trim();
  }

  var passageProofreadings = _.chain(_.groupBy(activities, 'activity_classification_id')[1])
    .map(function(n) {
      return {
        categoryId: n.topic_id,
        id: n.id,
        flags: n.flags,
        description: n.description,
        data: n.data,
        title: n.name.replace('Passage Proofreading: ', ''),
      };
    })
    .map(function(f) {
      f.flagId = _.findWhere(flags, {name: f.flags}).id;
      delete(f.flags);
      return f;
    })
    .reject(function(f) {
      var archived = _.findWhere(flags, {name: '{archived}'}).id;
      return f.flagId === archived;
    })
    .map(function(f) {
      f.data = _.findWhere(proofData, {id: f.id});
      delete(f.data.id);
      return f;
    })
    .map(function(d) {
      d.passage = parseYaml(d.data.body);
      d.instructions = parseYaml(d.data.instructions);
      delete(d.data);
      return d;
    });
  require('build')(
    _.extend({}, sentenceWritings, passageProofreadings)
  );
}
