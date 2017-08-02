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

/* GET retourne la liste des utilisateurs ou 1 utilisateur depuis son id. */
router.get('/pers/:id?', function(req, res, next) {
  
    var getPersonneId = function(retFunc){
        query = "SELECT id_personne, nom_personne, prenom_personne, is_parent FROM personnes";
        if(req.params.id){
            query += " WHERE id_personne = "+req.params.id;
        }
        query += " ORDER BY nom_personne";
        connection.query(query ,function(error, results, fields) {
            if(error) res.send(error);
            else retFunc(results);
        }); 
    }

    getPersonneId(function(results) {
        res.json(results);
    });    

});


/* GET retourne si la personne est un parent ou non */
router.get('/parent/:id', function(req, res, next) {
  
    var getParentId = function(retFunc){
        connection.query("SELECT is_parent FROM personnes WHERE id_personne = "+req.params.id, function(error, results, fields){
            if(error) res.send(error);
            else if(results.length > 0){
                retFunc(results[0].is_parent);
            }
            else retFunc("err");
        });
    }

    getParentId(function(results) {
        res.json(results);
    });    

});


/* POST ajoute une nouvelle personne et renvoie son id */
router.post('/', function(req, res, next) {
  
    var postPersonne = function(retFunc){
        if(!req.body.id_personne || req.body.id_personne==0){
            connection.query("INSERT INTO personnes (nom_personne, prenom_personne, is_parent) VALUES ('"+req.body.nom+"','"+req.body.prenom+"',"+req.body.is_parent+")",function(error, results, fields) {
                retFunc(results.insertId);
            });
        }
        else {
            retFunc(req.body.id_personne);
        }
    }

    postPersonne(function(results) {
        res.json(results);
    });    

});

module.exports = router;
