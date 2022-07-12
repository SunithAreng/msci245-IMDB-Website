let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// var cors = require('cors');
// app.use(cors());

// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

// 	if ('OPTIONS' === req.method) {
// 		res.send(200);
// 	}
// 	else {
// 		next();
// 	}
// });

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT name, id, year, quality FROM movies`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getReviews', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT r.reviewTitle, r.reviewContent, r.reviewScore, r.movies_id, r.user_userID , m.name
	FROM Review r, movies m
	WHERE r.movies_id = m.id`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);

	let movies_id = req.body.movies_id;
	let user_userID = req.body.user_userID;
	let reviewTitle = req.body.reviewTitle;
	let reviewContent = req.body.reviewContent;
	let reviewScore = req.body.reviewScore;

	let sql = `INSERT INTO Review (reviewTitle, reviewContent, reviewScore, movies_id, user_userID) VALUES (?, ?, ?, ?, ?)`;

	let data = [reviewTitle, reviewContent, reviewScore, movies_id, user_userID];

	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let getSql = `SELECT r.reviewTitle, r.reviewContent, r.reviewScore, r.movies_id, r.user_userID , m.name
						FROM Review r, movies m
						WHERE r.movies_id = m.id`;
		let getData = [];

		connection.query(getSql, getData, (error, results, fields) => {
			if (error) {
				return console.error(error.message);
			}
			let string = JSON.stringify(results);
			let obj = JSON.parse(string);
			res.send({ express: string });
			connection.end();
		});
	});
});

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

// app.listen(8081, () => console.log(`Listening on port ${port}`)); //for the dev version
app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
