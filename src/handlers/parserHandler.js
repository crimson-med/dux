const replaceRegex = function(regex, replacement){
  return function(str){
    return str.replace(regex, replacement);
  }
}
// Regular expressions for Markdown (a bit strict, but they work)
const codeBlockRegex = /```[a-z]*\n[\s\S]*?\n```/g;
const inlineCodeRegex = /\`(.*)\`/g;
const imageRegex = /!\[([^\[]+)\]\(([^\)]+)\)/g;
const linkRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
const headingRegex = /\n(#+\s*)(.*)/g;
const boldItalicsRegex = /(\*{1,2})(.*?)\1/g;
const strikethroughRegex = /(\~\~)(.*?)\1/g;
const blockquoteRegex = /\n(&gt;|\>)(.*)/g;
const horizontalRuleRegex = /\n((\-{3,})|(={3,}))/g;
const unorderedListRegex = /(\n\s*(\-|\+)\s.*)+/g;
const orderedListRegex = /(\n\s*([0-9]+\.)\s.*)+/g;
const paragraphRegex = /([^<>]+)(?![^<>]*(?:>|<\/))/g;
// Replacer functions for Markdown
const codeBlockReplacer = function(fullMatch){
  return ''
}
const imageReplacer = function(fullMatch, tagTitle, tagURL){
	return '<img src="' + tagURL + '" alt="' + tagTitle + '" />';
}
const linkReplacer = function(fullMatch, tagTitle, tagURL){
	return '<a target="_blank" href="' + tagURL + '">' + tagTitle + '</a>';
}
const headingReplacer = function(fullMatch, tagStart, tagContents){
	return '\n<h' + (tagStart.trim().length + 1) + '>' + tagContents + '</h' + (tagStart.trim().length + 1) + '>';
}
const boldItalicsReplacer = function(fullMatch, tagStart, tagContents){
	return '<' + ( (tagStart.trim().length==1)?('em'):('strong') ) + '>'+ tagContents + '</' + ( (tagStart.trim().length==1)?('em'):('strong') ) + '>';
}
const strikethroughReplacer = function(fullMatch, tagStart, tagContents){
	return '<del>' + tagContents + '</del>';
}
const blockquoteReplacer = function(fullMatch, tagStart, tagContents){
	return '\n<div class="quote">' + tagContents + '</div>';
}
const horizontalRuleReplacer = function(fullMatch){
	return '\n<hr />';
}
const unorderedListReplacer = function(fullMatch){
	let items = '';
	fullMatch.trim().split('\n').forEach( item => { items += '<li>' + item.substring(2) + '</li>'; } );
	return '\n<ul class="is-bulleted">' + items + '</ul>';
}
const orderedListReplacer = function(fullMatch){
	let items = '';
	fullMatch.trim().split('\n').forEach( item => { items += '<li>' + item.substring(item.indexOf('.')+2) + '</li>'; } );
	return '\n<ol>' + items + '</ol>';
}
const emptyLineReplacer = function (myStr){
  const res = myStr.replace(/^\s*[\r\n]/gm, "")
  return res
}
const inlineCodeReplacer = function (myStr) {
  // Longer code to prepare for language specification implementation
  var myRegexp = /\`(.*)\`/g;
  match = myRegexp.exec(myStr);
  while (match != null) {
    var result = match[0].substring(1, match[0].length-1);
    myStr = myStr.replace(match[0], '\n<pre class="language-js"><code>' + result + '</code></pre>')
    match = myRegexp.exec(myStr);
  }
  return myStr
}
const paragraphReplacer = function(fullMatch, tagContents){
  if (tagContents.length > 1){
    return '<p>' + tagContents + '</p>';
  }
	return tagContents;
}
// Rules for Markdown parsing (use in order of appearance for best results)
const replaceCodeBlocks = replaceRegex(codeBlockRegex, codeBlockReplacer);
const replaceImages = replaceRegex(imageRegex, imageReplacer);
const replaceLinks = replaceRegex(linkRegex, linkReplacer);
const replaceHeadings = replaceRegex(headingRegex, headingReplacer);
const replaceBoldItalics = replaceRegex(boldItalicsRegex, boldItalicsReplacer);
const replaceceStrikethrough = replaceRegex(strikethroughRegex, strikethroughReplacer);
const replaceBlockquotes = replaceRegex(blockquoteRegex, blockquoteReplacer);
const replaceHorizontalRules = replaceRegex(horizontalRuleRegex, horizontalRuleReplacer);
const replaceUnorderedLists = replaceRegex(unorderedListRegex, unorderedListReplacer);
const replaceOrderedLists = replaceRegex(orderedListRegex, orderedListReplacer);
const replaceParagraphs = replaceRegex(paragraphRegex, paragraphReplacer);
// Fix for tab-indexed code blocks
const codeBlockFixRegex = /\n(<pre><code>)((\n|.)*)(<\/code><\/pre>)/g;
const codeBlockFixer = function(fullMatch, tagStart, tagContents, lastMatch, tagEnd){
	let lines = '';
	tagContents.split('\n').forEach( line => { lines += line.substring(1) + '\n'; } );
	return tagStart + lines + tagEnd;
}
const fixCodeBlocks = replaceRegex(codeBlockFixRegex, codeBlockFixer);
// Replacement rule order function for Markdown
// Prefer parseMarkdown as seen below
const replaceMarkdown = function(str) {
  return replaceParagraphs(emptyLineReplacer(replaceOrderedLists(replaceUnorderedLists(
		replaceHorizontalRules(replaceBlockquotes(replaceceStrikethrough(
			replaceBoldItalics(replaceHeadings(replaceLinks(replaceImages(
				inlineCodeReplacer(replaceCodeBlocks(str))
      ))))
    )))
	))));
}
const getCodeBlock = function(str) {
  const allCodeBlocks = [];
  let m;
  do {
    m = codeBlockRegex.exec(str);
    if (m) {
        allCodeBlocks.push(m[0]);
    }
  } while (m);
  return allCodeBlocks
}
// Parser for Markdown (fixes code, adds empty lines around for parsing)
// Usage: parseMarkdown(strVar)
module.exports = {
  parseMarkdown: function (str) {
    const allCodeBlocks = getCodeBlock(str);
    let parsedMarkdown = fixCodeBlocks(replaceMarkdown('\n' + str + '\n')).trim();
    const result = {
      parsedCode: allCodeBlocks,
      parsedMarkdown: parsedMarkdown,
    }
    return result
  }
}
