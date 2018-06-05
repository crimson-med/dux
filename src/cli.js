#!/usr/bin/env node
// const colors = require("colors/safe");
const testFolder = './../md/';
const DuxEngine = require('./dux');
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
console.log( "projectName:", projectName );
let temp = new DuxEngine(projectName, testFolder);
temp.start();
// Make "get" the default if no verb is specified
//if ( !options.get && !options.post && !options.put && !options.del ) {
//    options.get = true;
//}

//console.log( "options:", options );
/* else if (argv.tool === "help") {
  console.log("\n ----------------------------------------------");
  console.log(colors.red(" Dux"));
  console.log(" ----------------------------------------------");
  console.log(colors.green("\n  dux --tool type --optionalToolParameter optionalToolParameterValue"));
  console.log("\n ----------------------------------------------");
  console.log(colors.red(" Tool Types:"));
  console.log(" ----------------------------------------------");
  console.log("  --- "+colors.cyan("help")+" \n  --- "+colors.cyan("proxy"));
  console.log("  ------ "+colors.cyan("proxyNumber")+" = number of proxy to find eg: 5");
  console.log("  ------ "+colors.cyan("country")+" (optional) = two letter string eg: fr");
  console.log("\n ----------------------------------------------");
  console.log(colors.red(" Command examples:"));
  console.log(" ----------------------------------------------");
  console.log(colors.green("  crimson-tools --tool help"));
  console.log(colors.green("  crimson-tools --tool proxy --proxyNumber 5"));
  console.log(colors.green("  crimson-tools --tool proxy --proxyNumber 5 --country fr"));
} */
