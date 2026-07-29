const connection = require('../db/connection');

//qui faccio le query al db

//AGGIUNGI LOG
function create(log, callback) {
    const query = `INSERT INTO audit_log (utente, username, indirizzo_ip, modulo, operazione, record_id, valore_precedente, valore_nuovo) VALUES (?, ?, ?, ?, ?,?, ?, ?)`;
    connection.query(query, [log.utente, log.username, log.indirizzoIp, log.modulo, log.operazione, log.recordId, JSON.stringify(log.valorePrecedente), JSON.stringify(log.valoreNuovo)], callback);
}

module.exports = { create };