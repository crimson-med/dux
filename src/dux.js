const fs = require("fs");
const path = require("path");
const parserHandler = require("./handlers/parserHandler");
const testFolder = './md/';
function extension(element) {
  var extName = path.extname(element);
  return extName === '.md' // change to whatever extensions you want
};
class DuxEngine {
  constructor(projectName, targetFolder) {
    // Matchmaking construction
    this.projectName = projectName;
    this.targetFolder = targetFolder;
    this.templateFolder = './templates/';
    this.menuItem = fs.readFileSync("./src/templates/body_menu.html", "utf8");
    this.finalMenu = [];
    this.finalData = [];
    this.start();
  }
  start() {
    const allFiles = fs.readdirSync(testFolder).filter(extension);
    allFiles.forEach(function(value, index) {
      const dat = fs.readFileSync(testFolder + value, 'utf8');
      const dataObject = {};
      dataObject.id = index;
      dataObject.name = value.replace(".md", "");
      const result = parserHandler.parseMarkdown(dat);
      dataObject.parsedMarkdown = result.parsedMarkdown;
      dataObject.parsedCode = result.parsedCode;
      let temp = menuItem;
      temp = temp.replace('***', index);
      temp = temp.replace("{}", dataObject.name);
      this.finalMenu.push(temp);
      this.finalData.push(dataObject);
    });
    console.log(JSON.stringify(this.finalMenu));
    console.log(JSON.stringify(this.finalData));
  }
}module.exports = DuxEngine
