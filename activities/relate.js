var _ = require('underscore');
module.exports = function(activities) {

  var flags = [{id:1, name: '{production'}, {id:2, name: '{beta}'},
    {id:3, name: '{alpha}'}, {id:4, name:'{archived}'}
  ];

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
    .value();
  require('build')(
    _.extend({}, sentenceWritings)
  );
}
