const fs = require("fs");
const path = require("path");
const colors = require("colors/safe");
const parserHandler = require("./handlers/parserHandler");
const duxTemplate = require("./models/duxTemplate");

const testFolder = './md/';
function extension(element) {
  var extName = path.extname(element);
  return extName === '.md'
};
class DuxEngine {
  constructor(projectName, targetFolder) {
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
    allFiles.forEach((value, index) => {
      const dat = fs.readFileSync(testFolder + value, 'utf8');
      const dataObject = {};
      dataObject.id = index;
      dataObject.name = value.replace(".md", "");
      const result = parserHandler.parseMarkdown(dat);
      dataObject.parsedMarkdown = result.parsedMarkdown;
      dataObject.parsedCode = result.parsedCode;
      let temp = this.menuItem;
      temp = temp.replace('***', index);
      temp = temp.replace("{}", dataObject.name);
      this.finalMenu.push(temp);
      this.finalData.push(dataObject);
    });
    const currentTemplate = new duxTemplate(this.finalMenu, this.finalData, this.projectName);
    currentTemplate.render().then(() => {
      console.log(colors.cyan(`Project was generated in: ${path.resolve('./duxOutput')}`))
    })
  }
}module.exports = DuxEngine
