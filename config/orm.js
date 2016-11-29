// =============================================================
// Dependencies
// =============================================================
var connection = require('./connection.js');

// =============================================================
// ORM 
// =============================================================


var orm = {
	allQuestions: function(callback){
		connection.query('SELECT * FROM questions;',function(err,result){
			if (err) throw err;
			callback(result);
			
		});
	},
	 
	// addBurgers: function(addBurger, callback) {
	// 	connection.query('INSERT INTO burgers SET ?' , {burgerName : addBurger}, function(err, result) {
	// 		if (err) throw err;
	// 		callback();
	// 	});
	// },

	getScore: function(id, callback){
		var script = "SELECT * FROM questions WHERE id = ?;";
		connection.query(script,[id],function(err,result){
			if (err) throw err;
			callback(result);
		});
	}

};

module.exports = orm;