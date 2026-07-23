const connection = require('../db/connection');

//qui faccio le query al db

//GET all di una sede
function findAll(idSede, callback) {
    const query = `SELECT i.id, per.nome, per.cognome, i.badge AS idBadge, b.codice AS badge, i.targa, DATE_FORMAT(i.data_ingresso, '%H:%i:%s %d/%m/%Y') AS dataIngresso, DATE_FORMAT(i.data_uscita, '%H:%i:%s %d/%m/%Y') AS dataUscita, i.categoria AS idCategoria, c.codice AS categoria, i.persona_riferimento AS idPersonaRiferimento, CONCAT(pr.cognome, ' ', pr.nome) AS personaRiferimento, pe.azienda AS idAzienda, a.ragione_sociale as azienda, i.divisione_destinazione AS idDivisione, d.nome as divisione 
    
    FROM ingressi_stabilimento i 
    JOIN badge b ON i.badge = b.id 
    JOIN categorie c ON i.categoria = c.id 
    JOIN persone per ON i.persona = per.id 
    LEFT JOIN persone pr ON i.persona_riferimento = pr.id 
    LEFT JOIN persone_esterne pe ON i.persona = pe.persona 
    LEFT JOIN aziende a ON pe.azienda = a.id 
    JOIN divisioni d ON i.divisione_destinazione = d.id 
    
    WHERE d.sede = ? AND i.is_active = true ORDER BY i.data_ingresso DESC`;
    connection.query(query, [idSede], callback);
}

//GET by data
function findAllByData(idSede, data, callback) {
    const query = `SELECT i.id, per.nome, per.cognome, i.badge AS idBadge, b.codice AS badge, i.targa, DATE_FORMAT(i.data_ingresso, '%H:%i:%s %d/%m/%Y') AS dataIngresso, DATE_FORMAT(i.data_uscita, '%H:%i:%s %d/%m/%Y') AS dataUscita, i.categoria AS idCategoria, c.codice AS categoria, i.persona_riferimento AS idPersonaRiferimento, CONCAT(pr.cognome, ' ', pr.nome) AS personaRiferimento, pe.azienda AS idAzienda, a.ragione_sociale as azienda, i.divisione_destinazione AS idDivisione, d.nome as divisione 
    
    FROM ingressi_stabilimento i 
    JOIN badge b ON i.badge = b.id 
    JOIN categorie c ON i.categoria = c.id
    JOIN persone per ON i.persona = per.id 
    LEFT JOIN persone pr ON i.persona_riferimento = pr.id 
    LEFT JOIN persone_esterne pe ON i.persona = pe.persona 
    LEFT JOIN aziende a ON pe.azienda = a.id 
    JOIN divisioni d ON i.divisione_destinazione = d.id 

    WHERE d.sede = ? AND i.data_ingresso >= ? AND i.data_ingresso < DATE_ADD(?, INTERVAL 1 DAY) AND i.is_active = true ORDER BY i.data_ingresso DESC`;
    connection.query(query, [idSede, data.inizioPeriodo, data.finePeriodo], callback);
}

//badge già usato
function badgeAlreadyTaken(badge, callback) {
    const query = `SELECT badge from ingressi_stabilimento WHERE badge = ? AND is_active = true AND data_uscita IS NULL`;
    connection.query(query, [badge], callback);
}

//POST
function create(data, callback) {
    const query = `INSERT INTO ingressi_stabilimento(persona, badge, targa, data_ingresso, categoria, persona_riferimento, divisione_destinazione) VALUES (?, ?, ?, NOW(), ?, ?, ?)`;
    connection.query(query, [data.persona, data.badge, data.targa, data.categoria, data.personaRiferimento, data.divisione], callback);
}

//PUT
function registerExit(id, callback) {
    const query = `UPDATE ingressi_stabilimento SET data_uscita = NOW() WHERE id = ? AND data_uscita IS NULL`;
    connection.query(query, [id], callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const query = `SELECT i.id, per.nome, per.cognome, i.badge AS idBadge, b.codice AS badge, i.targa, DATE_FORMAT(i.data_ingresso, '%H:%i:%s %d/%m/%Y') AS dataIngresso, DATE_FORMAT(i.data_uscita, '%H:%i:%s %d/%m/%Y') AS dataUscita, i.categoria AS idCategoria, c.codice AS categoria, i.persona_riferimento AS idPersonaRiferimento, CONCAT(pr.cognome, ' ', pr.nome) AS personaRiferimento, pe.azienda AS idAzienda, a.ragione_sociale as azienda, i.divisione_destinazione AS idDivisione, d.nome as divisione 
    
    FROM ingressi_stabilimento i 
    JOIN badge b ON i.badge = b.id 
    JOIN categorie c ON i.categoria = c.id
    JOIN persone per ON i.persona = per.id 
    LEFT JOIN persone pr ON i.persona_riferimento = pr.id 
    LEFT JOIN persone_esterne pe ON i.persona = pe.persona 
    LEFT JOIN aziende a ON pe.azienda = a.id 
    JOIN divisioni d ON i.divisione_destinazione = d.id 
    
    WHERE d.sede = ? AND ${campo} LIKE ? AND i.is_active = true ORDER BY i.data_ingresso DESC`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

//SEARCH PER DATA
function searchByData(idSede, data, campo, valore, callback) {
    const query = `SELECT i.id, per.nome, per.cognome, i.badge AS idBadge, b.codice AS badge, i.targa, DATE_FORMAT(i.data_ingresso, '%H:%i:%s %d/%m/%Y') AS dataIngresso, DATE_FORMAT(i.data_uscita, '%H:%i:%s %d/%m/%Y') AS dataUscita, i.categoria AS idCategoria, c.codice AS categoria, i.persona_riferimento AS idPersonaRiferimento, CONCAT(pr.cognome, ' ', pr.nome) AS personaRiferimento, pe.azienda AS idAzienda, a.ragione_sociale as azienda, i.divisione_destinazione AS idDivisione, d.nome as divisione 
    
    FROM ingressi_stabilimento i 
    JOIN badge b ON i.badge = b.id 
    JOIN categorie c ON i.categoria = c.id
    JOIN persone per ON i.persona = per.id 
    LEFT JOIN persone pr ON i.persona_riferimento = pr.id  
    LEFT JOIN persone_esterne pe ON i.persona = pe.persona 
    LEFT JOIN aziende a ON pe.azienda = a.id 
    JOIN divisioni d ON i.divisione_destinazione = d.id 
    
    WHERE d.sede = ? AND i.data_ingresso >= ? AND i.data_ingresso < DATE_ADD(?, INTERVAL 1 DAY) AND ${campo} LIKE ? AND i.is_active = true ORDER BY i.data_ingresso DESC`;
    connection.query(query, [idSede, data.inizioPeriodo, data.finePeriodo, `%${valore}%`], callback);
}

//controllo se persona è esterna
function isEsterna(id, callback) {
    const query = `SELECT 1 FROM persone_esterne WHERE persona = ?`;
    connection.query(query, [id], callback);
}

module.exports = { findAll, findAllByData, create, registerExit, search, searchByData, badgeAlreadyTaken, isEsterna };