'use strict';


//app is launched using a config file (check package.json scripts and change accordingly)
const config = require('../../config.js');
const NEEDED_PARAMS = [
  "BASE_URL"
];
config.checkConfig(NEEDED_PARAMS);
console.log('APP BASE_URL: ', global.BASE_URL);


//node modules
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

//controllers
const examples = require('../controllers/examples');


module.exports = function(app, express){

	app.use(function (req, res, next) {
	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', '*');
	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);
	    // Pass to next layer of middleware
	    next();
	});


	//setup router that will handle interactions with bots/user agents
	const nonSPArouter = express.Router();    

	// to track user agents and provide dynamic content, i.e meta headers get passed to jade template to create twitter/facebook cards
	nonSPArouter.get('/', function(req,res) {
		res.render('bot', { 
		  img       : "",
		  url       : "",
		  title     : "", 
		  descriptionText : "",
		  imageUrl  : ""
		});
	});

	//checks the request headers to see if user-agent is a bot, if bot send to nonSPArouter otherwise continue
	app.use(function(req,res,next) {
		let ua = req.headers['user-agent'];
		if(ua === 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko)' || ua === 'WhatsApp/2.18.22 i'){
			nonSPArouter(req,res,next);
		} else if (/^(facebookexternalhit)|(Twitterbot)|(WhatsApp)|(LinkedInBot)|(Facebot)|(Pinterest)/gi.test(ua)) {
		  nonSPArouter(req,res,next);
		} else {
		  next();
		}
	});

	//set render engine to jade
	app.set('view engine', 'jade');
	//parse req.body from client
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	//in case app needs to handle file uploads
	app.use(fileUpload());


	//API CALLS
	app.post('/api/examples/create',  examples.createOne);
	app.get('/api/examples/fetch',  examples.fetch);
	app.post('/api/examples/delete',  examples.delete);

}