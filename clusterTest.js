var fs = require("graceful-fs"),
	cluster = require("cluster"),
	// dir = "/Users/S/Downloads";
	dir = "/Users/S/Desktop/Project",
	taskList = [];

if (cluster.isMaster) {
	findDir(dir);

	for (var i=0; i<3; i++) {
		cluster.fork();
	}

	function assignTask(worker) {
		if (taskList.length) {
			var file = taskList.shift();
			worker.send(file);
		} else {
			worker.kill();
		}
	}

	cluster.on('online', function (worker) {
		console.log("worker online", worker.id);
		assignTask(worker);
	}).on('message', function (message) {
		console.log("worker request", message);
		var worker = cluster.workers[message];
		assignTask(worker);
	}).on('exit', function (worker, code, signal) {
		console.log("worker:", worker.id,"die code:", code, "signal:", signal);
		if (!Object.keys(cluster.workers).length) process.exit(0);
	});
} else if (cluster.isWorker) {
	console.log("Worker starts:", cluster.worker.id);

	process.on('message', function (file) {
		console.log("Worker", cluster.worker.id, "task received:", file);
		evaluateMd5(file, function() {
			process.send(cluster.worker.id);
		});
	});
}

function findDir(dir) {
	fs.readdir(dir, function (error, directoryArray) {
		if (error) return console.log(error);
		directoryArray.forEach(function (directory) {
			var file = dir+'/'+directory;
			fs.stat(file, function (error, stats) {
				if (error) return console.log("File stat error:", error);
				if (stats.isDirectory()) return findDir(file);
				if (!stats.isFile()) return console.log(file, "is not a file");
				// evaluateMd5(file);
				taskList.push(file);
			});
		});
	});
}

function evaluateMd5(file, callback) {
	var stream = fs.createReadStream(file),
		crypto = require("crypto"),
		hashing = crypto.createHash('md5'),
		callback = callback || function() {};

	stream.on('data', function (buffer) {
		hashing.update(buffer);
	}).on('end', function() {
		console.log(hashing.digest('hex'), file);
		callback();
	}).on('error', function (error) {
		console.log("File readstream error:", error);
		callback();
	});
}

// findDir(dir);
// [Finished in 6.1s]
// 2 clusters
// [Finished in 9.1s]
// 3 clusters
// [Finished in 7.6s]