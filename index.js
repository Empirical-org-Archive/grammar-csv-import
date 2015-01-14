var file = process.env.FILE;

if (!file) {
  throw new Error('Please pass FILE path env var');
}

var Converter=require("csvtojson").core.Converter;
var fs = require("fs");

var fileStream=fs.createReadStream(file);
var csvConverter=new Converter({constructResult:true});

csvConverter.on("end_parsed",function(obj){
  console.log(JSON.stringify(obj));
});

//read from file
fileStream.pipe(csvConverter);
