var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var connection = mysql.createConnection({
	host : 'localhost', // à renseigner
	user : 'root', // à renseigner
	password : '', // à renseigner
	database : 'gestbudget_db' // à renseigner
});


connection.connect();



router.get('/',function(req, res, next) {
 bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash("root", salt, function(err, hash) {
        res.json(hash);
      });
 });
} );

/* GET retourne la liste des depenses ou 1 depense si un id de personne est renseigné. */
router.get('/pers/:id?', function(req, res, next) {
  
  var getDepenses = function(retFunc){
    query = "SELECT id_depense, poste_depense, DATE_FORMAT(date_depense, '%Y-%m-%d') AS 'm_date_depense', prenom_personne, nom_personne, montant_depense FROM depenses d JOIN personnes p on d.personne_depense = p.id_personne";
    if(req.params.id) {
      query += " WHERE personne_depense = "+req.params.id;
    }
    query += " ORDER BY (m_date_depense) DESC";
    connection.query(query,function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(results);
    });
  }

  getDepenses(function(results) {
    res.json(results);
  });
    
});


/* GET retourne la depense correspondante à l'id renseigné dans l'url. */
router.get('/dep/:id', function(req, res, next) {
  
  var getDepensesId = function(retFunc){
    query = "SELECT id_depense, poste_depense, DATE_FORMAT(date_depense, '%Y-%m-%d') AS 'm_date_depense', prenom_personne, nom_personne, montant_depense, personne_depense FROM depenses d JOIN personnes p on d.personne_depense = p.id_personne WHERE id_depense = "+req.params.id;
    connection.query(query,function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(results[0]);
    });
  }

  getDepensesId(function(results) {
    res.json(results);
  });    

});


/* POST Ajoute une nouvelle depense */
router.post('/', function(req, res, next) {
  
  var postDepenses = function(retFunc){
    connection.query("INSERT INTO depenses (montant_depense, date_depense, poste_depense, personne_depense) VALUES ('"+req.body.montant+"','"+req.body.date+"','"+req.body.poste+"',"+req.body.id_pers+")",function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(results.insertId);
    });
  }

  postDepenses(function(results) {
    res.json(results);
  });    

});


/* PUT modifie la depense correspondante à l'id renseigné dans l'url. */
router.put('/:id', function(req, res, next) {
  
  var putDepensesId = function( retFunc){
    var query ="UPDATE depenses SET montant_depense = "+req.body.montant+", date_depense = '"+req.body.date+"', poste_depense='"+req.body.poste+"', personne_depense="+req.body.id_pers+" WHERE id_depense = "+req.params.id;
    connection.query(query ,function(error, results, fields) {
      if(error) res.send(error);
      else retFunc(req.params.id);
    });
  }

  putDepensesId(function(results) {
    res.json(results);
  });    

});


/* DELETE supprime la depense correspondante à l'id renseigné dans l'url. */
router.delete('/:id', function(req, res, next) {
  
  var deleteDepensesId = function(retFunc){
    connection.query("DELETE FROM depenses WHERE id_depense = "+req.params.id+";",function(error, results, fields) {
			if(error) res.send(error);
      else retFunc(req.params.id);
  	});
  }

  deleteDepensesId(function(results) {
    res.json(results);
  });    

});



module.exports = router;
