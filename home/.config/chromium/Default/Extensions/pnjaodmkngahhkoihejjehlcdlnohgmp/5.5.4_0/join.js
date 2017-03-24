#!/usr/bin/env node

var fs = require("fs");
var path = require("path");

function join(file, to, as) {
	var contents = fs.readFileSync(file).toString();
	var regex = /<script[^>]*src="(.*)"><\/script>/g;

	var files = [];
	contents = contents.replace(regex, function(m, url) {
		files.push(path.resolve(path.dirname(file), url));
		return "";
	});

	var all = files.map(function(path) {
		return fs.readFileSync(path).toString();
	}).join("\n;\n");

	contents += '<script src="' + as + '"></script>';

	fs.writeFileSync(file, contents);
	fs.writeFileSync(to, all);
}

join("popup.html", "popup/popup.js", "popup/popup.js");
join("options.html", "options/options.js", "options/options.js");
join("consume.html", "consume/consume.js", "consume/consume.js");
join("main.html", "reader/reader.js", "reader/reader.js");
