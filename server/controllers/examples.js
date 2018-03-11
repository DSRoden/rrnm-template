'use strict';


var Example = require('../models/example');

//create a document
exports.createOne = function(req, res){
	Example.createOne(req.body, function(response){
		if(!response){
			res.status(400).end();
		} else {
			res.send(response).end();
		}
	});
};

//fetch documents
exports.fetch = function(req, res){
	Example.fetch(function(response){
		if(!response){
			res.status(400).end();
		} else {
			res.send({examples: response}).end();
		}
	});
};

//delete document
exports.delete = function(req, res){
	Example.delete(req.body, function(response){
		if(!response){
			res.status(400).end();
		} else {
			res.status(200).end();
		}
	});
};
