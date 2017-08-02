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

/* GET retourne la liste des budgets ou 1 budget si un id de personne est renseigné. */
router.get('/pers/:id?', function(req, res, next) {
  
  var getBudget = function(retFunc){
    query = "SELECT id_budget, raison_budget, DATE_FORMAT(date_budget, '%Y-%m-%d') AS 'm_date_budget', prenom_personne, nom_personne, montant_budget FROM budgets d JOIN personnes p on d.personne_budget = p.id_personne";
    if(req.params.id) {
      query += " WHERE personne_budget = "+req.params.id;
    }
    query += " ORDER BY (m_date_budget) DESC";
    connection.query(query,function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(results);
    });
  }

  getBudget(function(results) {
    res.json(results);
  });
    
});


/* GET retourne le budget correspondante à l'id renseigné dans l'url. */
router.get('/budg/:id', function(req, res, next) {
  
  var getBudgetsId = function(retFunc){
    query = "SELECT id_budget, raison_budget, DATE_FORMAT(date_budget, '%Y-%m-%d') AS 'm_date_budget', prenom_personne, nom_personne, montant_budget, personne_budget FROM budgets d JOIN personnes p on d.personne_budget = p.id_personne WHERE id_budget = "+req.params.id;
    connection.query(query,function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(results);
    });
  }

  getBudgetsId(function(results) {
    res.json(results);
  });    

});


/* POST Ajoute un nouveau budget */
router.post('/', function(req, res, next) {
  
  var postBudgets = function(retFunc){
    connection.query("INSERT INTO budgets (montant_budget, date_budget, raison_budget, personne_budget) VALUES ('"+req.body.montant+"','"+req.body.date+"','"+req.body.raison+"',"+req.body.id_pers+")",function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(results.insertId);
    });
  }

  postBudgets(function(results) {
    res.json(results);
  });    

});


/* PUT modifie le budget correspondante à l'id renseigné dans l'url. */
router.put('/:id', function(req, res, next) {
  
  var putBudgetsId = function( retFunc){
    var query ="UPDATE budgets SET montant_budget = "+req.body.montant+", date_budget = '"+req.body.date+"', raison_budget='"+req.body.raison+"', personne_budget="+req.body.id_pers+" WHERE id_budget = "+req.params.id;
    connection.query(query ,function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(req.params.id);
    });
  }

  putBudgetsId(function(results) {
    res.json(results);
  });    

});


/* DELETE supprime le budget correspondante à l'id renseigné dans l'url. */
router.delete('/:id', function(req, res, next) {
  
  var deleteBudgetsId = function(retFunc){
    connection.query("DELETE FROM budgets WHERE id_budget = "+req.params.id+";",function(error, results, fields) {
			if(error) res.send(error);
      else retFunc(req.params.id);
  	});
  }

  deleteBudgetsId(function(results) {
    res.json(results);
  });    

});



module.exports = router;
