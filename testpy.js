var fs = require("fs"),
	file = "/Users/samson/Downloads/42B1F9.jpg";

var stream = fs.createReadStream(file);

fs.stat(file, function (error, stats) {
	if (error) return console.log("Stats error:", error);
	console.log("File size:", stats.size);
// 	fs.open(, 'r', function (error, fileDescriptor) {
// 		if (error) return console.log("File open error:", error);
// 		var buffer = new Buffer(stats.size);
// 		fs.read(fileDescriptor, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {

// 			fs.close(fileDescriptor);
// 		});
// 	});
});

// 62b09c9208053c600dc2e4f20f419eb4
var spawn = require("child_process").spawn,
	pythonSubProcess = spawn("python", ["test.py"]);

stream.pipe(pythonSubProcess.stdin);
pythonSubProcess.stdout.on("data", (function (index, data) {
	console.log(index+" python>> "+data);
}).bind(void 0, "test"));
pythonSubProcess.stderr.on("data", (function (index, data) {
	console.log(index+" python error>> ", data);
}).bind(void 0, "test"));
pythonSubProcess.on("close", (function (index, code) {
	console.log(index+" python close>> ", code);
}).bind(void 0, "test"));

// 62b09c9208053c600dc2e4f20f419eb4
// var crypto = require("crypto");
// var hashing = crypto.createHash("md5");
// // stream.pipe(hashing);
// stream.on("data", function (buffer) {
// 	hashing.update(buffer);
// });
// stream.on("end", function() {
// 	console.log(hashing.digest("hex"));
// });