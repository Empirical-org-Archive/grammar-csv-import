module.exports = function(cb) {
  var file = __dirname + '/quill-v2-concept-levels.csv';
  var Converter=require("csvtojson").core.Converter;
  var fs = require("fs");

  var fileStream=fs.createReadStream(file);
  var csvConverter=new Converter({constructResult:true});

  csvConverter.on("end_parsed",function(obj){
    cb(null, obj);
  });

  //read from file
  fileStream.pipe(csvConverter);
};
