const fs = require("fs");
const colors = require("colors/safe");
const testFolder = './md/';
const duxEngine = './src/dux';
function extension(element) {
  var extName = path.extname(element);
  return extName === '.md' // change to whatever extensions you want
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

module.exports = {

  test() {
    const temp = new duxEngine('test', testFolder);
    temp.start();
  }
};
