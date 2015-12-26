// var fs = require("fs"),
var fs = require("graceful-fs"),
	FileType = require("file-type"),
	// ReadChunk = require("read-chunk"),
	target = "/Users/samson/Downloads";

fs.readdir(target, function (error, directoryList) {
	console.log("Target: "+target, directoryList.length);
	var i = 1;
	directoryList.forEach(function (directory, index) {
		// ReadChunk(target+'/'+directory, 0, 262, function (error, buffer) {
		// 	var fileType = FileType(buffer);
		// 	console.log("fileType: "+(fileType && fileType.mime)+" file: "+directory);
		// });

		accessFile(target+'/'+directory, index);

		// var fullpath = target+'/'+directory;
		// fs.stat(fullpath, (function (index, fullpath, error, stats) {
		// 	if (error) return console.log("File stat error:", error);
		// 	if (!stats.isFile()) return;
		// 	// console.log(i+">"+directory);
		// 	// i++;
		// 	fs.open(fullpath, 'r', (function (index, error, fileDescriptor) {
		// 		if (error) return console.log("File open error:", error);
		// 		var whatForBuffer = new Buffer(262);
		// 		fs.read(fileDescriptor, whatForBuffer, 0, 262, void 0, (function (index, error, bytesRead, buffer) {
		// 			if (error) return console.log("File read error:", error, directory);
		// 			var fileType = FileType(buffer),
		// 				spawn = require("child_process").spawn,
		// 				pythonSubProcess = spawn("python", ["test.py", directory]);
		// 			console.log(index+">fileType: "+(fileType && fileType.mime)+" file: "+directory+ " reads: "+bytesRead);
					
		// 			pythonSubProcess.stdout.on("data", (function (index, data) {
		// 				console.log(index+" python>> "+data);
		// 			}).bind(void 0, index));
		// 			pythonSubProcess.stderr.on("data", (function (index, data) {
		// 				console.log(index+" python error>> ", data);
		// 			}).bind(void 0, index));
		// 			pythonSubProcess.on("close", (function (index, code) {
		// 				console.log(index+" python close>> ", code);
		// 			}).bind(void 0, index));
		// 			fs.close(fileDescriptor, function () {});
		// 		}).bind(void 0, index));
		// 	}).bind(void 0, index));
		// }).bind(void 0, index, fullpath));

	});
});

function accessFile(file, index) {
	fs.stat(file, function (error, stats) {
		if (error) return console.log("File stat error:", error);
		if (!stats.isFile()) return;
		var stream = fs.createReadStream(file),
			crypto = require("crypto"),
			hashing = crypto.createHash("md5"),
			buffer = new Buffer(262);
		stream.on("data", function (buffer) {
			hashing.update(buffer);
		}).on("end", function() {
			console.log(index+"> Hash:", hashing.digest("hex"), " File:", file);
		});
	});
}
// [Finished in 814.4s]

// var directoryList = fs.readdirSync(target);
// directoryList.forEach(function (directory) {
// 	var buffer = ReadChunk.sync(target+'/'+directory, 0, 262);
// 	var fileType = FileType(buffer);
// 	console.log("fileType: "+(fileType && fileType.mime)+" file: "+directory);
// });