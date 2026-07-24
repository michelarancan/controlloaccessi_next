const connection = require('../db/connection');

//qui faccio le query al db

//GET all di una sede
function findAll(idSede, callback) {
    const query = `SELECT a.id, pe.id AS idPersona, pe.nome, pe.cognome, DATE_FORMAT(a.data_inizio, '%Y-%m-%d') AS dataInizio, DATE_FORMAT(a.data_scadenza, '%Y-%m-%d') AS dataScadenza FROM persone_interne pi JOIN persone pe ON pi.persona = pe.id JOIN autorizzazioni a ON pi.persona = a.persona JOIN divisioni d ON pi.divisione = d.id WHERE d.sede = ? AND a.is_active = true ORDER BY pe.cognome, pe.nome`;
    connection.query(query, [idSede], callback);
}

//POST
function create(idPersona, idSede, data, callback) {
    const query = `INSERT INTO autorizzazioni(persona, sede, data_inizio, data_scadenza) VALUES (?, ?, ?, ?)`;
    connection.query(query, [idPersona, idSede, data.dataInizio, data.dataScadenza], callback);
}

//PUT
function update(id, data, callback) {
    const query = `UPDATE autorizzazioni SET data_scadenza = ? WHERE id = ?`;
    connection.query(query, [data.dataScadenza, id], callback);
}

//DELETE
function remove(id, callback) {
    const query = `UPDATE autorizzazioni SET is_active = false WHERE id = ?`;
    connection.query(query, [id], callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const query = `SELECT a.id, pe.id AS idPersona, pe.nome, pe.cognome, DATE_FORMAT(a.data_inizio, '%Y-%m-%d') AS dataInizio, DATE_FORMAT(a.data_scadenza, '%Y-%m-%d') AS dataScadenza FROM persone_interne pi JOIN persone pe ON pi.persona = pe.id JOIN autorizzazioni a ON pi.persona = a.persona JOIN divisioni d ON pi.divisione = d.id WHERE d.sede = ? AND a.is_active = true ORDER BY pe.cognome, pe.nome AND pe.${campo} LIKE ?`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

module.exports = { findAll, create, update, remove, search };