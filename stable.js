module.exports = function(obj) {
  return require('json-stable-stringify')(obj, {space: 2});
};
