var o = require('../activities/activities.json').sentenceWritings;

if (!o) {
  throw new Error('Kinda need this to do anything');
}

var _ = require('underscore');


var pp = require('../print.js');

pp(
  _.chain(o)
    .map(function(sw, key) {
      sw.swId = key;
      return sw;
    })
    .groupBy('categoryId')
    .map(function(group, groupId) {
      return [groupId,
        _.chain(group)
          .map(function(member) {
            return [member.swId, true];
          })
          .object()
          .value()
      ];
    })
    .object()
    .value()
);
