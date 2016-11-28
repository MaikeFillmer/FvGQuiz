// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var mysql      = require('mysql');



//connection
//var connection = require('./config/connection.js');


// EXPRESS CONFIGURATION
var app = express(); // Tells node that we are creating an "express" server
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


//handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: '.handlebars',
    layoutsDir: './views/layouts'}));
app.set('view engine','handlebars');
app.set('views', __dirname + '/views');


//method override
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});

//ROUTES


require('./controller.js')(app); 


