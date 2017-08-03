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


/* GET retourne le total des transactions des personnes */
router.get('/', function(req, res, next) {
  
    var getTotal = function(retFunc){
        var total_tab = [];
        connection.query("SELECT COALESCE(SUM(montant_rentree), 0) as sum_rentrees, id_personne, nom_personne, prenom_personne FROM personnes p left JOIN rentrees r ON p.id_personne = r.personne_rentree GROUP BY id_personne ORDER BY nom_personne",function(error, results, fields) {
            sum_rentrees = results;
            connection.query("SELECT COALESCE(SUM(montant_depense), 0) as sum_depenses, id_personne, nom_personne, prenom_personne FROM personnes p left JOIN depenses d ON p.id_personne = d.personne_depense GROUP BY id_personne ORDER BY nom_personne",function(error, results, fields) {
                sum_depenses = results;
                connection.query("SELECT COALESCE(SUM(montant_budget), 0) as sum_budget, id_personne, nom_personne, prenom_personne FROM personnes p left JOIN budgets d ON p.id_personne = d.personne_budget GROUP BY id_personne ORDER BY nom_personne",function(error, results, fields) {
                    sum_budget = results;
                    for(var ind = 0; ind < sum_depenses.length; ind++){
                        total_tab[ind] = { 'id': sum_depenses[ind].id_personne, 'nom': sum_depenses[ind].prenom_personne+" "+sum_depenses[ind].nom_personne, 'total': (sum_rentrees[ind].sum_rentrees-sum_depenses[ind].sum_depenses-sum_budget[ind].sum_budget) };
                    }
                    retFunc(total_tab);
                });
            });
        });
    }

    getTotal(function(results) {
        res.json(results);
    });    

});


/* GET retourne le total des transactions d'une personne */
router.get('/total/:id', function(req, res, next) {
  
    var getTotalId = function(retFunc){
	connection.query("SELECT SUM(montant_depense) AS montant_n FROM depenses WHERE personne_depense = "+req.params.id, function(error, results, fields) {
	    sum_depenses = results[0].montant_n;
	    connection.query("SELECT SUM(montant_rentree) AS montant_p FROM rentrees WHERE personne_rentree = "+req.params.id, function(error, results, fields) {
		    sum_rentres = results[0].montant_p;
            connection.query("SELECT SUM(montant_budget) AS montant_p FROM budgets WHERE personne_budget = "+req.params.id, function(error, results, fields) {
                sum_budgets = results[0].montant_p;

                retFunc(sum_rentres - sum_depenses - sum_budgets);
            });
		});
	});
}

    getTotalId(function(results) {
        res.json(results);
    });    

});


/* GET retourne si la personne est un parent ou non */
router.get('/transac/:id', function(req, res, next) {
  
    var getTransacId = function(retFunc){
        var tab1, tab2, tab3;
        var query1 = "SELECT id_depense AS id, poste_depense AS nom_transac, DATE_FORMAT(date_depense, '%Y-%m-%d') AS 'm_date', prenom_personne, nom_personne, montant_depense AS montant_n FROM depenses d JOIN personnes p on d.personne_depense = p.id_personne WHERE personne_depense = "+req.params.id;
        var query2 = "SELECT id_rentree AS id, origine_rentree AS nom_transac, DATE_FORMAT(date_rentree, '%Y-%m-%d') AS 'm_date', prenom_personne, nom_personne, montant_rentree AS montant_p FROM rentrees d JOIN personnes p on d.personne_rentree = p.id_personne WHERE personne_rentree = "+req.params.id;
        var query3 = "SELECT id_budget AS id, raison_budget AS nom_transac, DATE_FORMAT(date_budget, '%Y-%m-%d') AS 'm_date', prenom_personne, nom_personne, montant_budget AS montant_n FROM budgets d JOIN personnes p on d.personne_budget = p.id_personne WHERE personne_budget = "+req.params.id;
        connection.query(query1,function(error, results, fields) {
            tab1 = results;
            connection.query(query2,function(error, results, fields) {
                tab2 = results;
                connection.query(query3,function(error, results, fields) {
                    tab3 = results;
                    retFunc(tab1.concat(tab2).concat(tab3).sort(function (a, b) {
                        return a.m_date < b.m_date;
                    }));
                });
            });
        });

    }

    getTransacId(function(results) {
        res.json(results);
    });    

});



module.exports = router;
