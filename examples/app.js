"use strict";

var http = require("http");
var path = require("path");

var express = require("express");
var vext = require("vext");

var app = express();

vext.set("layout", "template/layouts/admin.vm");

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "template/views/admin"));
app.set("view engine", "vm");

app.use(express.static(path.join(__dirname)));

app.engine("vm", vext.__express);

app.use("/", require("./template/routes/index"));

//设端口
var port = process.argv[2];
port = /^\d{4,5}$/.test(port) ? port : app.get('port');
console.log('Listening on', port);

http.createServer(app).listen(port, function(){
  console.log("Server listening on port " + port);
}).on('error',function(err){
  console.log('错了',err.code);
});
