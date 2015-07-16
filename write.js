var fs = require('fs');
module.exports = function(obj, path) {
  fs.writeFileSync(path, require(__dirname + '/stable')(obj));
};
