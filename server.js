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

// The below code of cors is only needed to run the code on dev mode. My PC does not support the default steps.
// Hence this work around method was introduced.

var cors = require('cors');
app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	if ('OPTIONS' === req.method) {
		res.send(200);
	}
	else {
		next();
	}
});

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
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
		connection.end();
	});
});

app.post('/api/findMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	let movieSearchTerm = req.body.movieSearchTerm;
	let actorSearchTerm = req.body.actorSearchTerm;
	let directorSearchTerm = req.body.directorSearchTerm;
	console.log("movieSearchTerm: ", movieSearchTerm);
	console.log("actorSearchTerm: ", actorSearchTerm);
	console.log("directorSearchTerm: ", directorSearchTerm);

	let sql = `SELECT reviewTitle, reviewContent, AverageReview, reviewScore, r.movies_id, r.user_userID , m.name, CONCAT(d.first_name, " ", d.last_name) AS dname
	FROM Review r, movies m, directors d, movies_directors ms, (select m.id as MoID, Round(avg(r.reviewScore), 1) as AverageReview
																from movies m, Review r
																where m.id = r.movies_id
																group by m.id) AS rtable
	WHERE r.movies_id = m.id
	AND rtable.MoID = r.movies_id
	AND ms.movie_id = r.movies_id
	AND ms.director_id = d.id`;

	let data = [];
	
	if (movieSearchTerm){
		sql = sql + ` AND m.name = ?`;
		data.push(movieSearchTerm);
	}

	if (directorSearchTerm){
		sql = sql + ` AND  CONCAT(d.first_name, " ", d.last_name) IN (?)`;
		data.push(directorSearchTerm);
	}

	if (actorSearchTerm){
		sql = sql + 
		` 
		AND r.movies_id IN (
			SELECT roles.movie_id
			FROM roles , actors 
			WHERE roles.actor_id = actors.id
			AND CONCAT(actors.first_name, " ", actors.last_name) IN (?)
		)`;
		data.push(actorSearchTerm);
	}

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		console.log(results);

		let string = JSON.stringify(results);
		res.send({ express: string });
		connection.end();
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

app.listen(8081, () => console.log(`Listening on port ${port}`)); //for the dev version
// app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server