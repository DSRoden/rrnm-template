'use strict';

const Mongo = require('mongodb');

function Example(exampleDoc){
	this.title = exampleDoc.title 
}

Object.defineProperty(Example, 'collection', {
  get: function(){return global.mongodb.collection('examples');}
});

Example.createOne = (form, cb) => {
	//form contains title attribute
	let exampleDoc = new Example(form);
	Example.collection.save(exampleDoc, cb(exampleDoc))
};

Example.fetch = (cb) => {
	Example.collection.find({}).toArray((err, examples)=>{
		if(err){
			console.log('ERROR FETCHING EXAMPLES: ' + JSON.stringify(err))
			return cb();
		}
		cb(examples);
	});
};


Example.delete = (example, cb) => {
	Example.collection.remove({_id: Mongo.ObjectId(example._id)}, (err, res)=>{
		cb(res);
	})
};

module.exports = Example;

