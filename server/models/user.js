'use strict';

const Mongo = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app_secret = 'secret09';

function User(user){
	this.created_at = new Date();
	this.access_token = user.access_token;

	this.social_provider = user.social_provider;
	this.social_profile = user.social_profile;
	this.social_token = user.social_token;

	// this.first_name = user.first_name;
	// this.last_name = user.last_name;
	this.birthdate = user.birthdate;
	this.email = user.email;
	this.username = user.username;
	this.password = user.password;
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.checkUsername = (data, cb)=>{
	//check if a username is valid
}

User.signup = (user, cb) =>{
	User.collection.findOne({email: user.email.toLowerCase()}, (err, foundUser)=>{
		if(err){
			return cb();
		}
		if(foundUser){
			return cb();
		}
		let saltRounds = 10;
		bcrypt.hash(user.password, saltRounds, function(err, hash) {
		  	user.password = hash;
	    	user.email = user.email.toLowerCase();
	    	user.username = user.username.toLowerCase();
		    user.access_token = token();
		    let newUser = new User(user);
		    User.collection.save(newUser, cb(newUser));
		});

	})
};

User.login = (user, cb) =>{
	User.collection.findOne({$or: [{email: user.email.toLowerCase()}, {username: user.email}]}, (err, foundUser)=>{
		if(err){
			return cb();
		}
		if(!foundUser){
			return cb();
		}

		bcrypt.compare(user.password, foundUser.password, function(err, res) {
			if(err){
				return cb();
			}
		  	if(res) {
				// Passwords match
				//update user access token
			    foundUser.access_token = token(foundUser.email);
			    User.collection.findOneAndUpdate({_id: foundUser._id}, {$set: {access_token: foundUser.access_token}}, (err, updated)=>{
			   		return cb(foundUser)
			    })
		  	} else {
			   // Passwords don't match
		   		return cb()
		  	} 
		});

	});
}

function token(identifier){

	 var token = jwt.sign({identifier: identifier}, app_secret, {
	      expiresIn: '8760h'  // expires in 24 hours * 30
	    });

	 return token;
    // return rand() + rand(); // to make it longer
}

module.exports = User;