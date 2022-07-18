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

/* 
  ******* Working SQL query example for our task ********
SELECT r.title, GROUP_CONCAT(i.name) AS ingredients
FROM ingredient i, recipe r, recipeIngredient ri  
WHERE r.recipeID = ri.recipeID  
AND i.ingredientID = ri.ingredientID  
AND  r.recipeID IN (
	SELECT ri.recipeID 
	FROM recipeIngredient ri, ingredient i 
	WHERE i.ingredientID = ri.ingredientID 
	AND i.name = 'apple' 
	AND r.calories <= 500)  
GROUP BY r.recipeID;
*/

/* 
	The GROUP_CONCAT() function in MySQL is used to concatenate data from multiple rows into one field.
*/

	let sql = `SELECT r.reviewTitle, r.reviewContent, r.reviewScore, r.movies_id, r.user_userID , m.name, CONCAT(d.first_name, " ", d.last_name) AS dname
	FROM Review r, movies m, directors d, movies_directors ms
	WHERE r.movies_id = m.id
	AND ms.movie_id = r.movies_id
	AND ms.director_id = d.id`;

	let data = [];
	//Since either ingredientSearchTerm or CalorieSearchTerm can be empty, 
	//we need to add their respective SQL clauses and corresponding data array elements (for '?' placeholders) conditionally.
	if (movieSearchTerm){
		sql = sql + ` AND m.name = ?`;
		data.push(movieSearchTerm);
	}

	if (directorSearchTerm){
		sql = sql + ` AND  CONCAT(d.first_name, " ", d.last_name) IN (?)`;
		data.push(directorSearchTerm);
	}

	if (actorSearchTerm){
		sql = sql + ` AND  CONCAT(a.first_name, " ", a.last_name) IN (?)`;
		data.push(directorSearchTerm);
	}

	//finally, add the GROUP BY clause to complete our SQL query
	//sql = sql + ` GROUP BY dname;`


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