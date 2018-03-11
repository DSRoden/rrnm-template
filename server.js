const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


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


var nonSPArouter = express.Router();    

nonSPArouter.get('/', function(req,res) {
	console.log('bot hit');
	var img   = 'http://gph.is/2g6wFlx';
	res.render('bot', { 
	  img       : img,
	  url       : "http://gph.is/2g6wFlx",
	  title     : 'throo', 
	  descriptionText : 'Throo',
	  imageUrl  : img
	});
});


//checks the request headers to see if user-agent is a bot, if bot send to nonSPArouter otherwise continue
app.use(function(req,res,next) {
	var ua = req.headers['user-agent'];
	console.log('user agent', ua);
	if(ua === 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko)' || ua === 'WhatsApp/2.18.22 i'){
		nonSPArouter(req,res,next);
	} else if (/^(facebookexternalhit)|(Twitterbot)|(WhatsApp)|(LinkedInBot)|(Facebot)|(Pinterest)/gi.test(ua)) {
	  // console.log(ua,' is a bot');
	  nonSPArouter(req,res,next);
	} else {
	  next();
	}
});

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(methodOverride());

app.get('/api/hello', (req, res) => {
	console.log('hitting hello');
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));


