const connection = require('../db/connection');

//qui faccio le query al db

//GET all di una sede
function findAll(idSede, callback) {
    const query = `SELECT a.id, pe.id AS idPersona, pe.nome, pe.cognome, DATE_FORMAT(a.data_inizio, '%Y-%m-%d') AS dataInizio, DATE_FORMAT(a.data_scadenza, '%Y-%m-%d') AS dataScadenza, a.divisione AS idDivisione, d.nome AS divisione FROM persone_interne pi JOIN persone pe ON pi.persona = pe.id JOIN autorizzazioni a ON pi.persona = a.persona JOIN divisioni d ON a.divisione = d.id WHERE d.sede = ? AND a.is_active = true ORDER BY pe.cognome, pe.nome`;
    connection.query(query, [idSede], callback);
}

//GET by id
function findById(id, callback) {
    const query = `SELECT persona, divisione, data_inizio, data_scadenza FROM autorizzazioni WHERE id = ?`;
    connection.query(query, [id], callback);
}

//POST
function create(idPersona, userId, data, callback) {
    const query = `INSERT INTO autorizzazioni(persona, divisione, data_inizio, data_scadenza, created_by) VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [idPersona, data.divisione, data.dataInizio, data.dataScadenza, userId], callback);
}

//PUT
function update(id, userId, data, callback) {
    const query = `UPDATE autorizzazioni SET data_scadenza = ?, updated_by = ? WHERE id = ?`;
    connection.query(query, [data.dataScadenza, userId, id], callback);
}

//DELETE
function remove(id, userId, callback) {
    const query = `UPDATE autorizzazioni SET is_active = false, updated_by = ? WHERE id = ?`;
    connection.query(query, [userId, id], callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const query = `SELECT a.id, pe.id AS idPersona, pe.nome, pe.cognome, DATE_FORMAT(a.data_inizio, '%Y-%m-%d') AS dataInizio, DATE_FORMAT(a.data_scadenza, '%Y-%m-%d') AS dataScadenza, a.divisione AS idDivisione, d.nome AS divisione FROM persone_interne pi JOIN persone pe ON pi.persona = pe.id JOIN autorizzazioni a ON pi.persona = a.persona JOIN divisioni d ON a.divisione = d.id WHERE d.sede = ? AND a.is_active = true AND pe.${campo} LIKE ? ORDER BY pe.cognome, pe.nome`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

//persona ha autorizzazione per divisione
function isValid(idPersona, idDivisione, callback) {
    const query = `SELECT 1 FROM autorizzazioni WHERE persona = ? AND divisione = ? AND data_inizio <= CURRENT_DATE() AND (data_scadenza IS NULL OR data_scadenza >= CURRENT_DATE()) AND is_active = true`;
    connection.query(query, [idPersona, idDivisione], callback);
}

module.exports = { findAll, findById, create, update, remove, search, isValid };