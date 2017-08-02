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


/* POST retourne l'existance ou non d'un login entré en parametres */
router.post('/log/', function(req, res, next) {
  
    var testLogin = function(retFunc){
        connection.query("SELECT login_connect FROM connect WHERE login_connect = '"+req.body.login+"'", function(error, results, fields){
            if(error) res.send(error);
            else if(results.length > 0){
                retFunc(true);
            }
            else retFunc(false);
        });
    }

    testLogin(function(results) {
        res.json(results);
    });    

});


/* POST retourne l'existance ou non d'un login entré en parametres */
router.post('/', function(req, res, next) {
  
    var postUsers = function(retFunc){
      connection.query("INSERT INTO connect (login_connect, password_connect, personne_connect) VALUES ('"+req.body.login+"','"+req.body.password+"',"+req.body.id_pers+")",function(error, results, fields) {
        if(error) res.send(error);
        else retFunc(0);
      });
    }

    postUsers(function(results) {
        res.json(results);
    });    

});


/* GET retourne la liste des utilisateur ou 1 utilisateur si un id est renseigné */
router.get('/:id?', function(req, res, next) {
  
    var getUsersId = function(retFunc){
      var query = "SELECT id_personne, nom_personne, prenom_personne, is_parent, login_connect, password_connect FROM personnes p LEFT JOIN connect c ON p.id_personne = c.personne_connect";
      if(req.params.id){
        query += " WHERE id_personne = "+req.params.id;
      }
      query += " ORDER BY nom_personne";
      connection.query(query,function(error, results, fields) {
          if(error) res.send(error);
          else retFunc(results);
        }); 
    }

    getUsersId(function(results) {
        res.json(results);
    });    

});


/* PUT modifier l'utilisateur entré en parametre via son id */
router.put('/:id', function(req, res, next) {
  
    var putUsersId = function(retFunc){
      var query1;
      if(req.body.login){ 
        query1 = "INSERT INTO connect (login_connect, password_connect, personne_connect) VALUES ('"+req.body.login+"','',"+req.params.id+")";
      } else if(req.body.password) {
        query1 = "UPDATE connect SET password_connect = '"+req.body.password+"' WHERE personne_connect = '"+req.params.id+"'";
      }

      var query2 = "UPDATE personnes SET nom_personne ='"+req.body.nom+"', prenom_personne = '"+req.body.prenom+"', is_parent = "+req.body.is_parent+" WHERE id_personne = "+req.params.id;

      connection.query(query2 ,function(error, results, fields) {
        if(query1){
          connection.query(query1 ,function(error, results, fields) {
            if(error) res.send(error);
            else retFunc('ok');
          });
        }
        else {
          if(error) res.send(error);
          else retFunc('ok');
        }
      });
    }

    putUsersId(function(results) {
        res.json(results);
    });    

});


/* DELETE supprime l'utilisateur correspondant à l'id renseigné dans l'url et tous les budgets, depenses, rentrées correspondants. */
router.delete('/:id', function(req, res, next) {
  
  var deleteUsersId = function(retFunc){
    connection.query("DELETE FROM rentrees WHERE personne_rentree = "+req.params.id, function(error, results, fields) {
      connection.query("DELETE FROM depenses WHERE personne_depense = "+req.params.id, function(error, results, fields) {
        connection.query("DELETE FROM budgets WHERE personne_budget = "+req.params.id, function(error, results, fields) {
          connection.query("DELETE FROM connect WHERE personne_connect = "+req.params.id, function(error, results, fields) {
            connection.query("DELETE FROM personnes WHERE id_personne = "+req.params.id, function(error, results, fields) {
                retFunc(req.params.id);
            }); 
          }); 
        }); 
      }); 
    }); 
  }

  deleteUsersId(function(results) {
    res.json(results);
  });    

});

module.exports = router;
