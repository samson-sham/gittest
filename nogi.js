var http = require("http"),
	url = require("url");
// 	cheerio = require("cheerio"),
	// options,
	// request;

// var src = url.parse("http://blog.nogizaka46.com/");

// options = {
// 	host: src.host,
// 	port: src.port,
// 	method: 'GET'
// }

// request = http.request(options, function (result) {
// 	var body = "";
// 	console.log('Status:', result.statusCode);
// 	result.setEncoding('utf8');
// 	result.on('data', function (line) {
// 		body += line;
// 	});

// 	result.on('end', function () {
// 		console.log(body);
// 		var $ = cheerio.load(body)
// 			images = $(".entrybody > img");
// 		console.log("Result:", images.length, images);
// 	});
// });

// request.on('error', function (error) {
// 	console.log("Error:", error);
// });

// request.end();

var gm = require("gm"),
	fs = require("graceful-fs"),
	cheerio = require("cheerio"),
	stream = fs.createReadStream("test.html"),
	body;

// stream.on('data', function (line) {
// 	body += line;
// }).on('end', function() {
// 	var $ = cheerio.load(body),
// 		images = $(".entrybody").find("img");

// 	images.each(function (index, element) {
// 		// console.log($(this).attr("src"));
// 		// var src = url.parse($(this).attr("src")),

// 		// http.request({
// 		// 	host: src.host,
// 		// 	path: src.path,
// 		// 	port: src.port,
// 		// 	method: 'GET'
// 		// }
// 		http.request($(this).attr("src"), (function (src, response) {
// 			console.log(response.statusCode, src);
// 			gm(response).size(function (error, size) {
// 				if (error) return console.log("Error:", error);
// 				console.log(src, size.width, size.height);
// 				// if (size.width < 150 || size.height < 150);
// 			});
// 		}).bind(void 0, $(this).attr("src"))).on('error', function (error) {
// 			console.log("Error:", error);
// 		}).end();
// 	});
// });

gm("/Users/samson/Desktop/Screen Shot 2015-11-26 at 1.51.11 pm.png").size(function (error, size) {
	if (error) return console.log("Error:", error);
	console.log(size);
})