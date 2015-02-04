var _ = require('underscore');
module.exports = function(activities, activityClassifications) {

  var sentenceWritings = _.groupBy(activities, 'activity_classification_id')[2];
  var flags = [{id:1, name: 'production'}, {id:2, name: 'beta'}];

  sentenceWritings = _.map(sentenceWritings, function(n) {
    return {
      categoryId: n.topic_id,
      description: n.description,
      flags: n.flags,
      data: n.data,
      title: n.name,
    };
  });
  require('build')(
    _.extend({}, sentenceWritings)
  );
}
