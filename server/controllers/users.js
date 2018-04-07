'user strict';

const User = require('../models/user');

exports.signup = function(req, res){
	User.signup(req.body, function(user){
		if(!user){
			res.status(400).end();
		} else {
			res.send(user).end();
		}
	});
};

exports.login = function(req, res){
	User.login(req.body, function(user){
		if(!user){
			res.status(400).end();
		} else {
			res.send(user).end();
		}
	});
};



