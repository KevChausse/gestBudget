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

/* GET retourne la liste des rentrees ou 1 rentree si un id de personne est renseigné. */
router.get('/pers/:id?', function(req, res, next) {
  
  var getRentrees = function(retFunc){
    query = "SELECT id_rentree, origine_rentree, DATE_FORMAT(date_rentree, '%Y-%m-%d') AS 'm_date_rentree', prenom_personne, nom_personne, montant_rentree FROM rentrees d JOIN personnes p on d.personne_rentree = p.id_personne";
    if(req.params.id) {
      query += " WHERE personne_rentree = "+req.params.id;
    }
    query += " ORDER BY (m_date_rentree) DESC";
    connection.query(query,function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(results);
    });
  }

  getRentrees(function(results) {
    res.json(results);
  });
    
});


/* GET retourne la rentrée correspondante à l'id renseigné dans l'url. */
router.get('/rent/:id', function(req, res, next) {
  
  var getRentreesId = function(retFunc){
    query = "SELECT id_rentree, origine_rentree, DATE_FORMAT(date_rentree, '%Y-%m-%d') AS 'm_date_rentree', prenom_personne, nom_personne, montant_rentree, personne_rentree FROM rentrees d JOIN personnes p on d.personne_rentree = p.id_personne WHERE id_rentree = "+req.params.id;
    connection.query(query,function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(results);
    });
  }

  getRentreesId(function(results) {
    res.json(results);
  });    

});


/* POST Ajoute une nouvelle rentrée */
router.post('/', function(req, res, next) {
  
  var postRentrees = function(retFunc){
    connection.query("INSERT INTO rentrees (montant_rentree, date_rentree, origine_rentree, personne_rentree) VALUES ('"+req.body.montant+"','"+req.body.date+"','"+req.body.origine+"',"+req.body.id_pers+")",function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(results.insertId);
    });
  }

  postRentrees(function(results) {
    res.json(results);
  });    

});


/* PUT modifie la rentrée correspondante à l'id renseigné dans l'url. */
router.put('/:id', function(req, res, next) {
  
  var putRentreesId = function( retFunc){
    var query ="UPDATE rentrees SET montant_rentree = "+req.body.montant+", date_rentree = '"+req.body.date+"', origine_rentree='"+req.body.origine+"', personne_rentree="+req.body.id_pers+" WHERE id_rentree = "+req.params.id;
    connection.query(query ,function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(req.params.id);
    });
  }

  putRentreesId(function(results) {
    res.json(results);
  });    

});


/* DELETE supprime la rentrée correspondante à l'id renseigné dans l'url. */
router.delete('/:id', function(req, res, next) {
  
  var deleteRentreesId = function(retFunc){
    connection.query("DELETE FROM rentrees WHERE id_rentree = "+req.params.id+";",function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(req.params.id);
    });
  }

  deleteRentreesId(function(results) {
    res.json(results);
  });    

});



module.exports = router;
