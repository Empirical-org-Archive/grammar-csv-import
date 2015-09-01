var _ = require('underscore');
var instructions = require('./../v1/cms/cms.json').instructions;

module.exports = function(rqs) {
  console.log(rqs);
  return _.map(rqs, function(rq) {
    console.log(rq);
    rq.instructions = instructions[rq.instructions];
    return rq;
  });
}
