console.log("Prompt test begins...");
var readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
}),
username, password;

readline.question("username: ", function(user) {
	readline.question("password: ", function(pw) {
		username = user;
		password = pw;
		readline.close();

		printOut();
	});
});

function printOut() {
	console.log("username: "+username+" password: "+password);
}