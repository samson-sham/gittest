// var childProcess = require("child_process");
// var gitProcess = childProcess.spawn("prompt.js");
// var gitProcess = childProcess.fork("prompt.js");

// gitProcess.stdin.setEncoding('utf8');
// gitProcess.stdout.pipe(process.stdout);


// 	gitProcess = childProcess.fork("prompt.js");

// gitProcess.stdout.on('data', function(data) {
// 	console.log('stdout: '+data);
// });

// childProcess.exec("node prompt.js", function() {

// });

// console.log(require.resolve("promise"));
var fs = require("graceful-fs"),
	dir = "/Users/S/Downloads";

fs.readdir(dir, function (error, directoryArray) {
	if (error) return console.log(error);
	// console.log(directoryArray);
	directoryArray.forEach(function (directory) {
		// console.log(directory);
		var file = dir+'/'+directory;
		fs.stat(file, function (error, stats) {
			if (error) return console.log("File stat error:", error);
			if (!stats.isFile()) return console.log(file, "is not a file");
			evaluateMd5(file);
		});
	});
});

function evaluateMd5(file) {
	var stream = fs.createReadStream(file),
		crypto = require("crypto"),
		hashing = crypto.createHash('md5');

	stream.on('data', function (buffer) {
		hashing.update(buffer);
	}).on('end', function() {
		console.log(hashing.digest('hex'), file);
	});
}
