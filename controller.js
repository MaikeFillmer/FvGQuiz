var path = require('path');
var orm = require('./config/orm.js');
var async = require('async');

module.exports = function(app){
	app.get('/', function(req,res) {
        res.render('index');
        
    });
    app.get('/quiz', function(req,res) {
        orm.allQuestions(function(question){
        	res.render('quiz', {question});
        })
        
    });
    app.post('/submit', function(req,res) {
    	var score = 0;
    	
    	var keyCount = 0;
    	for (var key in req.body) {
    		if (req.body.hasOwnProperty(key)) {
    			keyCount++;
    		}
    	}

    	var results = [];
    	console.log(req.body)
    	for (var key in req.body) {
    		console.log(key + " right now")
    			if(key.includes("sa")){
    				orm.getScore(key[2], function(place){
    					score += place[0].agreeS;
						console.log("score sa " + score + " key: " + key)
						results.push("placeholder");
						if(results.length == keyCount) {
							getResult(score);
						}
    				})
				} else if (key.includes("aa")){
					orm.getScore(key[2], function(place){
    					score += place[0].agree;
						console.log("score aa " + score + " key: " + key)
						results.push("placeholder");
						if(results.length == keyCount) {
							getResult(score);
						}
    				})
				} else if (key.includes("dd")){
					orm.getScore(key[2], function(place){
    					score += place[0].disagree;
						console.log("score dd " + score + " key: " + key)
						results.push("placeholder");
						if(results.length == keyCount) {
							getResult(score);
						}
    				})
				} else if (key.includes("sd")){
					orm.getScore(key[2], function(place){
    					score += place[0].disagreeS;
						console.log("score sd " + score + " key: " + key)
						results.push("placeholder");
						if(results.length == keyCount) {
							getResult(score);
						}
    				})
				}
    	}

    	
		function getResult(score) {
			var result = {};
			if(score >= 45) {
				result.name = "Strong Growth Mindset";
				result.score = score;
				result.paragraph = "Your results indicate that you have a "
				result.paragraph2 = "Strong Growth mindset";
				result.paragraph3 = " which is a great way to continue to learn and challenge yourself in a positive way!";
			} else if (score >=34 && score <= 44) {
				result.name = "Growth Mindset with some Fixed ideas";
				result.score = score;
				result.paragraph = "Your results indicate that you have a "
				result.paragraph2 = "Growth Mindset with some Fixed ideas";
				result.paragraph3 = " which means that while you mostly grow from challenging experiences, there are still some ideas which fall into the Fixed mindset.";
			} else if (score >= 21 && score <= 33){
				result.name = "Fixed Mindset with some Growth ideas";
				result.score = score;
				result.paragraph = "Your results indicate that you have a "
				result.paragraph2 = "Fixed Mindset with some Growth ideas";
				result.paragraph3 = " which means that while you have mostly Fixed ideas, you also have some Growth mindset ideas, so you can build on increasing them!";
			} else {
				result.name = "Strong Fixed Mindset";
				result.score = score;
				result.paragraph = "Your results indicate that you have a "
				result.paragraph2 = "Strong Fixed Mindset";
				result.paragraph3 = ". Look at the image below to get some ideas on how to move into the Growth Mindset!";
			}
			result.percent = Math.round(score/45*100);
			console.log(result)
			res.render('submit', {result})
		}

    })
}
