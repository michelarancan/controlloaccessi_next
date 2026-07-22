const connection = require('../db/connection');

//qui faccio le query al db

//GET all di una sede
function findAll(idSede, callback) {
    const query = `SELECT i.id, i.nome, i.cognome, b.codice as badge, i.targa, DATE_FORMAT(i.data_ingresso, '%H:%i:%s %d/%m/%Y') as dataIngresso, DATE_FORMAT(i.data_uscita, '%H:%i:%s %d/%m/%Y') AS dataUscita, c.codice AS categoria, CONCAT(p.cognome, ' ', p.nome) AS personaRiferimento, a.ragione_sociale as azienda, d.nome as divisione FROM ingressi_stabilimento i JOIN badge b ON i.badge = b.id JOIN categorie c ON i.categoria = c.id JOIN persone_interne p ON i.persona_riferimento = p.id JOIN aziende a ON i.azienda = a.id JOIN divisioni d ON i.divisione_destinazione = d.id WHERE d.sede = ? AND i.is_active = true ORDER BY i.data_ingresso DESC`;
    connection.query(query, [idSede], callback);
}

//POST
function create(data, callback) {
    const query = `INSERT INTO ingressi_stabilimento(nome, cognome, badge, targa, data_ingresso, categoria, persona_riferimento, azienda, divisione_destinazione) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)`;
    connection.query(query, [data.nome, data.cognome, data.badge, data.targa, data.categoria, data.personaRiferimento, data.azienda, data.divisione], callback);
}

//PUT
function registerExit(id, callback) {
    const query = `UPDATE ingressi_stabilimento SET data_uscita = NOW() WHERE id = ? AND data_uscita IS NULL`;
    connection.query(query, [id], callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const query = `SELECT i.id, i.nome, i.cognome, b.codice as badge, i.targa, DATE_FORMAT(i.data_ingresso, '%H:%i:%s %d/%m/%Y') as dataIngresso, DATE_FORMAT(i.data_uscita, '%H:%i:%s %d/%m/%Y') AS dataUscita, c.codice AS categoria, CONCAT(p.cognome, ' ', p.nome) AS personaRiferimento, a.ragione_sociale as azienda, d.nome as divisione FROM ingressi_stabilimento i JOIN badge b ON i.badge = b.id JOIN categorie c ON i.categoria = c.id JOIN persone_interne p ON i.persona_riferimento = p.id JOIN aziende a ON i.azienda = a.id JOIN divisioni d ON i.divisione_destinazione = d.id WHERE d.sede = ? AND ${campo} LIKE ? AND i.is_active = true ORDER BY i.data_ingresso DESC`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

module.exports = { findAll, create, registerExit, search };