var q = require("q"),
	util = require("util"),
	fs = require("graceful-fs"),
	cluster = require("cluster"),
	target = "/Users/samson/Downloads";


// function getDirectoryList() {
// 		deferred = q.defer();
// 	fs.readdir(target, function (error, directoryList) {
// 		if (error) return deferred.reject(error);
// 		return deferred.resolve(directoryList);
// 	});
// 	return deferred.promise;
// }

if (cluster.isMaster) {
	console.log("Master cluster setup...");

	var pool = [];
	var readdir = q.nfbind(fs.readdir);
	var readdirPromise = readdir(target);
	readdirPromise.done(function (directoryList) {
		console.log("Readdir resolved");
		pool = directoryList;
	});

	for (var i=0;i<4;i++) {
		cluster.fork();
	}

	function assignWork(worker) {
		readdirPromise.then(function() {
			var file = pool.pop();
			console.log("Assigning", file, "to", worker.id);
			if (file) {
				worker.send(file);
			} else {
				worker.kill();
			}
		});
	}

	cluster.on('online', function (worker) {
		console.log("Worker "+worker.process.pid+" online!");
		assignWork(worker);
	});

	cluster.on('message', function (workerId) {
		var worker = cluster.workers[workerId];
		assignWork(worker);
	});

	cluster.on('exit', function (worker, code, signal) {
		console.log("Worker "+worker.process.pid+" died! code:", code, " signal:", signal);
		console.log("Existing workers:", Object.keys(cluster.workers).length);
		readdirPromise.then(function() {
			if (pool.length) {
				cluster.fork();
			} else {
				console.log("Worker killed", worker.id);
			}
		});
	});
} else if (cluster.isWorker) {
	console.log("Worker "+cluster.worker.id+" initiates!");
	var crypto = require("crypto");

	process.on('message', function (message) {
		console.log("Worker received meesage");
		if (!message) return process.exit(-1);
		var file = target+'/'+message;
		fs.stat(file, function (error, stats) {
			if (error) {
				console.log("File stat error:", error);
				return process.exit(-2);
			}
			if (!stats.isFile()) return process.exit(-3);
			var stream = fs.createReadStream(file),
				hashing = crypto.createHash("md5");
			stream.on('data', function (buffer) {
				hashing.update(buffer);
			}).on('end', function() {
				console.log("Hash:", hashing.digest('hex'), " File:", file);
				process.send(cluster.worker.id);
			});
		});
	});
}