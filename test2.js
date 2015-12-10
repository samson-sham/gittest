var ContentRange = require("http-range").ContentRange,
    Range = require("http-range").Range,
    FileType = require("file-type"),
    http = require("http");

var options = {
    "hostname": "pic.prepics-cdn.com",
    "path": "/eb62fea3fd04f/50514475.jpeg",
    "port": 80,
    "method": "GET",
    "headers": {
        "Range": (new Range('bytes', '0-261')).toString()
    }
};
// var options = {
//     "hostname": "pic.prepics-cdn.com",
//     "path": "/eb62fea3fd04f/50514475.jpeg",
//     "port": 80,
//     "method": "GET",
//     "headers": {
//         "Range": 'bytes=0-262'
//     }
// };
// console.log(options);
// req = http.request(options, function(incomingMessage) {
//     console.log('STATUS: '+incomingMessage.statusCode);
//     console.log('HEADERS: '+JSON.stringify(incomingMessage.headers));
//     contentRange = ContentRange.prototype.parse(incomingMessage.headers["content-range"]);
//     console.log(contentRange);
//     incomingMessage.setEncoding('utf8');    // Change incomingMessage from Buffer to String
//     var data = '';
//     incomingMessage.on('data', function (buffer) {
//         console.log('Stream on data...');
//         data += buffer;
//     });
//     incomingMessage.on('end', function () {
//         console.log('Stream on complete!', data.length);
//         console.log(data);
//     });
// });

var req = http.request(options, function(incomingMessage) {
        console.log('STATUS: '+incomingMessage.statusCode);
        console.log('HEADERS: '+JSON.stringify(incomingMessage.headers));
        var bufferList = [];
        incomingMessage.on('data', function (buffer) {
            console.log('Stream on data...');
            bufferList.push(buffer);
        });
        incomingMessage.on('end', function () {
            var data = Buffer.concat(bufferList);
            console.log('Stream on complete!', data.length);
            console.log(FileType(data));
            console.log(data);
        });
    });
req.on('error', function(e) {
    console.log('Error: '+e.message);
});
req.end();