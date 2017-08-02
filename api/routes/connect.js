var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost', // à renseigner
	user : 'root', // à renseigner
	password : '', // à renseigner
	database : 'gestbudget_db' // à renseigner
});


connection.connect();

/* POST new user. */
router.post('/', function(req, res, next){

 var postUser = function(retFunc){
   console.log("SELECT * FROM connect WHERE login_connect='"+req.body.login+"' and password_connect='"+req.body.password+"'");
    connection.query("SELECT * FROM connect WHERE login_connect='"+req.body.login+"' and password_connect='"+req.body.password+"'",function(error, results, fields) {
	      if(error) res.send(error);
        else if (results.length > 0){
          retFunc(true);
        }
        else retFunc(false);
    }); 
        
  }

  postUser(function(results) {
    res.json(results);
  });
  
});

module.exports = router;
