
var ins = require('./../v1/cms/cms.json').instructions;
module.exports = function(id) {
  return ins[id];
};
