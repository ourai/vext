"use strict";

const path = require("path");
const fs = require("fs");

const velocity = require("velocityjs");

const DEFAULTS = {
  LAYOUT: "template/layouts/default.vm"
};

const vext = module.exports = {
  __settings: {}
};

Object.keys(DEFAULTS).forEach(function( k, i ) {
  vext.__settings[k.toLowerCase()] = DEFAULTS[k];
});

vext.set = function( k, v ) {
  if ( vext.__settings.hasOwnProperty(k) ) {
    vext.__settings[k] = v;
  }

  return vext.__settings[k];
};

vext.__express = function( templatePath, options, callback ) {
  let cwd = process.cwd();

  let macros = {
    parse: function( file ) {
      return this.eval(fs.readFileSync(path.join(cwd, file)).toString());
    }
  };

  let content = fs.readFileSync(templatePath).toString();
  let layout = fs.readFileSync(path.join(cwd, vext.__settings.layout)).toString();

  let directives = [];
  let htmlStr = [];
  let parseMacros = [];

  velocity.parse(content).forEach(function( a ) {
    if ( typeof a === "string" ) {
      if ( a.trim() !== "" ) {
        htmlStr.push(a);
      }
    }
    else {
      if ( a.type === "macro_call" && a.id === "parse" ) {
        parseMacros.push(a);
      }
      else {
        directives.push(a);
      }
    }
  });

  directives.push([{type: "define", id: "screen_content"}, htmlStr.join("")].concat(parseMacros));

  try {
    callback(null, (new velocity.Compile(directives.concat(velocity.parse(layout)))).render(options, macros));
  }
  catch( err ) {
    console.log(err);
    callback(err);
  }
};
