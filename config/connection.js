//connection to mysql database

var express = require('express');
var bodyParser = require('body-parser');
var app = express(); // Tells node that we are creating an "express" server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


var mysql = require('mysql');


var connection = mysql.createConnection(process.env.JAWSDB_URL);
	



connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;