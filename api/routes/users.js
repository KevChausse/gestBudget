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
    var query = "SELECT login_connect, password_connect FROM connect ORDER BY login_connect ASC";
    connection.query(query,function(error, results, fields) {
        if(error) res.send(error);
        else retFunc(results);
    }); 
  }
  getUsers(function(results) {
    res.json(results);
  });

});



/* GET user by login. */
router.get('/:id', function(req, res, next){

 var getUsers = function(idPers, retFunc){

    var query = "SELECT login_connect, password_connect FROM connect WHERE login_connect = '"+idPers+"'";
    connection.query(query,function(error, results, fields) {
        if(error) res.send(error);
        else retFunc(results);
    }); 

  }
  getUsers(req.params.id, function(results) {
    res.json(results);
  });
  
});


/* POST new user. */
router.post('/', function(req, res, next){

 var postUser = function(retFunc){
   
    connection.query("INSERT INTO connect (login_connect, password_connect, personne_connect) VALUES ('"+req.body.login+"','"+req.body.password+"',"+req.body.id_personne+")",function(error, results, fields) {
	      if(error) res.send(error);
        else retFunc(results);
    }); 
        
  }

  postUser(function(results) {
    res.json(results);
  });
  
});


/* DELETE new user. */
router.delete('/:id', function(req, res, next){

 var delUser = function(id_pers, retFunc){
   
    connection.query("DELETE FROM connect WHERE login_connect = '"+id_pers+"'", function(error, results, fields) {
	      if(error) res.send(error);
        else retFunc(results);
    }); 
        
  }

  delUser(req.params.id, function(results) {
    res.json(results);
  });
  
});

module.exports = router;
