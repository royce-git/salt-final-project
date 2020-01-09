const express = require('express');
const registrationRoutes = express.Router();
const bcrypt = require('bcryptjs');
let Registration = require('./schema');

// Registration route
registrationRoutes.route('/register').post((req, res) => {
	let register = new Registration(req.body);
	register.save()
		.then(reg => {
			console.log('User added ', req.body.user_name);
			
			res.sendStatus(200);
		})
		.catch(err => {
			console.log('User NOT added ', req.body);
			res.sendStatus(400);
		});
});

// Login Router
registrationRoutes.route('/login').post((req, res) => {
	console.log('login request', req.body);
	Registration.findOne({user_name: req.body.user_name})
	.then(user => {
		console.log("User from login", user)
		if(!user){ 
			res.sendStatus(400)
			   //.json({Error: 'person doesnt exist in database'});
		}
		else {
			bcrypt.compare(req.body.password, user.password)
			.then(passwordMatch => passwordMatch ? res.json(user) : res.sendStatus(204))
			.catch(err => console.log('Login route error', err))
		}
	})
	.catch(err => res.json({Error: err}))
});

// Username validation Router
registrationRoutes.route('/validateUsername').post((req, res) => {
	Registration.findOne({user_name: req.body.user_name})
	.then(user => user ? res.sendStatus(204) : res.sendStatus(200))
	.catch(err => console.log(err))
});

// Get allData
registrationRoutes.route('/allData').get(function (req, res) {
	Registration.find((err, data) => err ? res.sendStatus(400) : res.json(data));
});

module.exports = registrationRoutes;
