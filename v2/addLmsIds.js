var Promise = require('bluebird');
var http = require('request-promise-json');
var host = 'https://staging.quill.org/api/v1';

var _ = require('underscore');
var natural = require('natural');

var THRESHOLD = 0.8;

function JaroWinkler(str, list, key) {
  if (!str) {
    return null;
  }
  var best = _.filter(list, function(e) {
    e.distance = natural.JaroWinklerDistance(str, e[key]);
    return e.distance >= THRESHOLD;
  });
  var r = null;
  if (best.length > 0) {
    r = _.max(best, function(b) {
      return b.distance;
    });
  }
  _.each(list, function(e) {
    delete(e.distance);
  });
  return r;
}

module.exports = function(conceptsWithQuestions) {
  return Promise.props({
    standards: http.get(host + '/topics'),
    standard_levels: http.get(host + '/topic_categories'),
    concepts: http.get(host + '/concepts')
  }).then(function(result) {
    var standards = result.standards.topic;
    var standardLevels = result.standard_levels.topic_categories;
    var concepts = result.concepts.concepts;
    return _.chain(conceptsWithQuestions)
      .map(function(c, id) {
        c.standard_level = JaroWinkler(c.standard_level, standardLevels, 'name');
        c.standard = JaroWinkler(c.standard, standards, 'name')
        c.concept_level_2 = JaroWinkler(c.concept_level_2, _.where(concepts, {level: 2}), 'name');
        c.concept_level_1 = JaroWinkler(c.concept_level_1, _.where(concepts, {level: 1}), 'name');
        c.concept_level_0 = JaroWinkler(c.concept_level_0, _.where(concepts, {level: 0}), 'name');
        if (c.concept_level_0) {
          c.title = c.concept_level_0.name;
        }
        return [id, c];
      })
      .object()
      .value();
  });
};
