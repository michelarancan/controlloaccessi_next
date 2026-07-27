const connection = require('../db/connection');

//qui faccio le query al db

//GET all by sede
function findAllBySede(idSede, callback) {
    const query = `SELECT id, codice FROM badge WHERE sede = ?`;
    connection.query(query, [idSede], callback);
}

//GET all by sede ancora in giro
function findAllAroundBySede(idSede, callback) {
    const query = `SELECT b.id, b.codice, CONCAT(per.cognome, ' ', per.nome) as nominativoPrestito, DATE_FORMAT(i.data_ingresso, '%H:%i:%s') AS oraPrestito FROM badge b JOIN ingressi_stabilimento i ON b.id = i.badge JOIN persone per ON per.id = i.persona WHERE i.data_uscita IS NULL AND b.sede = ? AND i.is_active = true`
    connection.query(query, [idSede], callback);
}

module.exports = { findAllBySede, findAllAroundBySede };