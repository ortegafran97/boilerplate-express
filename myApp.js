var express = require('express');
var bodyParser = require("body-parser")
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
})

app.get('/now', function(req, res, next) {
	req.time = new Date().toString();
	next();
}, function(req, res) {
	res.send({ time: req.time });
})

app.use("/public", express.static(__dirname + "/public"));
function HelloExpress(req, res) {
	res.sendFile(__dirname + "/views/index.html")
}

app.get("/", HelloExpress)
app.get("/json", (req, res) => {
	let response = "Hello json";
	if (process.env.MESSAGE_STYLE === "uppercase") { response = response.toUpperCase(); }
	res.json({ "message": response })
})

app.get("/:word/echo", function(req, res) {
	res.send({ echo: req.params.word })
})

app.route("/name")
	.get(function(req, res) {
		const response = `${req.query.first} ${req.query.last}`
		res.json({ "name": response })
	}).post(function(req, res) {
		const response = `${req.body.first} ${req.body.last}`;
		res.json({ "name": response })
	}

	)




























module.exports = app;
