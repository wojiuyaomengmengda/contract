const path = require("path");
const fs = require("fs");
const http = require('http');
const Port = 9996;
const index = require('./index');

console.log(index)
module.exports = function () {
    console.log('123')
  http.createServer(index).listen(Port, function (req, res) {
    console.log('Http server listening on port ' + Port);
  });
}
