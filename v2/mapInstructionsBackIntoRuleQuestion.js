var instructions = require('./../v1/cms/cms.json').instructions;

module.exports = function(rq) {
  return instructions[rq.instructions];
}
