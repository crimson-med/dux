#!/usr/bin/env node
const colors = require("colors/safe");
const testFolder = './../md/';
const DuxEngine = require('./dux');
const path = require("path");
const options = require( "yargs" )
    .usage( "Usage: $0 <project> <directory> [-t \"theme\"]" )
    .command( "project", "project name", { alias: "project" } )
    .command( "directory", "directory to render", { alias: "directory" } )
    .required( 1, "project name is required" )
    .required( 2, "directory is required" )
    .option( "t", { alias: "theme", demand: false, describe: "theme name", type: "string" } )
    .help( "?" )
    .alias( "?", "help" )
    .example( "$0 Bloom-Doc /home/bloom-project/doc", "Render a project called Bloom-Doc from given location" )
    .example( "$0 My API /home/personal/api -t dark", "Render a project with the dark theme" )
    .epilog( "Copyright 2018 Mederic Burlet" )
    .argv;
// Get the directory from the first parameter
var projectName = options._[ 0 ];
var projectFolder = options._[ 1 ];
console.warn(path.resolve(projectFolder));
console.log(colors.green(' ____  __  __  _  _ '));
console.log(colors.green('(  _ \\(  )(  )( \\/ )'));
console.log(colors.green(' )(_) ))(__)(  )  ( '));
console.log(colors.green("(____/(______)(_/\\_)"));
console.log(colors.cyan("\n\nGenerating: ", projectName ));
let temp = new DuxEngine(projectName, projectFolder);
// Make "get" the default if no verb is specified
//if ( !options.get && !options.post && !options.put && !options.del ) {
//    options.get = true;
//}
