module.exports = function(obj) {
  console.log(require('json-stable-stringify')(obj, {space: 2}));
}
