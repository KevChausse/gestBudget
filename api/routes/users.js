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

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var getUsers = function(retFunc){
    var query = "SELECT login_connect, password_connect FROM connect";
    connection.query(query,function(error, results, fields) {
        retFunc(results);
    }); 
  }
  getUsers(function(results) {
    res.json(results);
  });
  


});

module.exports = router;
