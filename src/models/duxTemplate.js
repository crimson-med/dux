const fs = require("fs");
const path = require('path');
const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    console.log('Generation impossible please try deleting duxOutput folder.')
  }
}
class duxTemplate {
  constructor(finalMenu, finalData, projectName) {
    this.finalMenu = finalMenu;
    this.finalData = finalData;
    this.templateFolder = './src/templates/';
    this.headerStart = fs.readFileSync(this.templateFolder + 'body_header.html', 'utf8');
    this.headerStart = this.headerStart.replace('Project Name', projectName);
    this.headerEnd = fs.readFileSync(this.templateFolder + 'body_header_end.html', 'utf8');
    this.footer = fs.readFileSync(this.templateFolder + 'footer.html', 'utf8');
  }

  emptyLineReplacer(myStr) {
    const res = myStr.replace(/^\s*[\r\n]/gm, "")
    return res
  }

  renderMenu() {
    let duxMenu = '';
    for (let i = 0; i < this.finalMenu.length; i += 1) {
      duxMenu += this.finalMenu[i];
    }
    return duxMenu
  }

  renderBody() {
    let duxBody = '';
    for (let i = 0; i < this.finalData.length; i += 1) {
      let content = fs.readFileSync(this.templateFolder + 'body_tab_content.html', 'utf8');
      if (i === 0) {
        content = content.replace('///','');
      } else {
        content = content.replace('///','is-hidden');
      }
      content = content.replace('***',this.finalData[i].id);
      content = content.replace('{}',this.finalData[i].name);
      content = content.replace('[]',this.finalData[i].parsedMarkdown);
      if (this.finalData[i].parsedCode.length <= 0) {
        content = content.replace('is-4', 'is-9');
      }
      duxBody += content;
    }
    return duxBody;
  }

  renderCode() {
    let duxCode = '';
    for (let i = 0; i < this.finalData.length; i += 1) {
      let code = fs.readFileSync(this.templateFolder + 'body_tab_code.html', 'utf8');
      let wrapper = fs.readFileSync(this.templateFolder + 'body_tab_code_wrapper.html', 'utf8');
      if (i === 0) {
        code = code.replace('///','');
      } else {
        code = code.replace('///','is-hidden');
      }
      code = code.replace('***',this.finalData[i].id);
      const codeBlocks = []
      for (let j = 0; j < this.finalData[i].parsedCode.length; j++) {
        const treated = this.emptyLineReplacer(this.finalData[i].parsedCode[j].split("\n").slice(1).join("\n"))
        let blem = treated.split("\n");
        const final = blem.slice(0,blem.length-1).join("\n")
        let temp = wrapper.replace('[]',final);
        codeBlocks.push(temp)
      }
      code = code.replace('[]',codeBlocks.join("\n<hr/>\n"));
      if (this.finalData[i].parsedCode.length <= 0) {
        duxCode = '';
      } else {
        duxCode += code;
      }
    }
    return duxCode
  }

  render() {
    return new Promise((resolve, reject) => {
      const duxMenu = this.renderMenu();
      const duxBody = this.renderBody();
      const duxCode = this.renderCode();
      const final = this.headerStart + duxMenu + this.headerEnd + duxBody + duxCode + this.footer;
      try {
        if (!fs.existsSync(path.resolve('./duxOutput'))) {
          mkdirSync(path.resolve('./duxOutput'));
        }
        fs.writeFileSync('./duxOutput/index.html', final, 'utf8');
        resolve(true);
      } catch (e) {
        reject(e)
      }
    })
  }

}module.exports = duxTemplate
