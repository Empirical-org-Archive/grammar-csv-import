var Promise = require('bluebird');
var http = require('request-promise-json');
var host = 'https://staging.quill.org/api/v1';

var _ = require('underscore');

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
        c.standard_level = _.findWhere(standardLevels, {name: c.standard_level});
        c.standard = _.findWhere(standards, {name: c.standard});
        return [id, c];
      })
      .object()
      .value();
  });
};
