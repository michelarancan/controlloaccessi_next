const connection = require('../db/connection');

//qui faccio le query al db

//GET all by sede
function findAllBySede(idSede, callback) {
    const query = `SELECT id, codice, descrizione FROM chiavi WHERE sede = ? AND is_active = true ORDER BY codice`;
    connection.query(query, [idSede], callback);
}

//GET all by sede ancora in giro
function findAllAroundBySede(idSede, callback) {
    const query = `SELECT c.id, c.codice, CONCAT(p.cognome, ' ', p.nome) AS nominativoPrestito, DATE_FORMAT(m.data_prelievo, '%H:%i:%s') AS oraPrestito FROM movimenti_chiavi m JOIN chiavi c ON c.id = m.chiave JOIN persone p ON m.nominativo_prelievo = p.id WHERE m.data_restituzione IS NULL AND c.sede = ? AND m.is_active = true ORDER BY m.data_prelievo DESC`;
    connection.query(query, [idSede], callback);
}

module.exports = { findAllBySede, findAllAroundBySede };