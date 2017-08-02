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

/* POST verifie si le login et mot de passe correspondent dans la base de données. Retourne false ou la ligne correspondante*/
router.post('/', function(req, res, next){

 var postUser = function(retFunc){
    connection.query("SELECT * FROM connect WHERE login_connect='"+req.body.login+"' and password_connect='"+req.body.password+"'",function(error, results, fields) {
	      if(error) res.send(error);
        else if (results.length > 0){
          retFunc(results);
        }
        else retFunc(false);
    }); 
        
  }

  postUser(function(results) {
    res.json(results);
  });
  
});

module.exports = router;
