var stealTools = require("steal-tools");

var buildPromise = stealTools.build({
  config: __dirname + "/package.json!npm"
}, {
  bundleAssets: true
});
// options added by `donejs add cordova` - START
var cordovaOptions = {
  buildDir: "./build/cordova",
  id: "com.donejs.placemyorder",
  name: "place my order",
  platforms: ["android","wp8","windows"],
  plugins: ["cordova-plugin-transport-security"],
  index: __dirname + "/production.html",
  glob: [
    "node_modules/steal/steal.production.js"
  ]
};

var stealCordova = require("steal-cordova")(cordovaOptions);
// Check if the cordova option is passed.
var buildCordova = process.argv.indexOf("cordova") > 0;

if(buildCordova) {
  buildPromise.then(stealCordova.build).then(stealCordova.android.emulate);
}
// options added by `donejs add cordova` - END
// options added by `donejs add nw` - START
var nwOptions = {
  buildDir: "./build",
  version: "0.12.3",
  platforms: ["win32","win64"],
  glob: [
  "package.json",
  "production.html",
  "node_modules/steal/steal.production.js",
  "node_modules/place-my-order-assets/images/**/*"
  ]
};

var stealNw = require("steal-nw");

// Check if the cordova option is passed.
var buildNW = process.argv.indexOf("nw") > 0;

if(buildNW) {
  buildPromise = buildPromise.then(function(buildResult){
    stealNw(nwOptions, buildResult);
  });
}
// options added by `donejs add nw` - END
