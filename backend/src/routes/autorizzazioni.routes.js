const express = require('express');
const router = express.Router();

const permissions = require('../config/permessi');
const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/autorizzazioni.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/autorizzazioni/interne/sedi/{idS}:
 *   get:
 *     summary: Restituisce tutte le autorizzazioni di una certa sede
 *     tags:
 *       - Autorizzazioni
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elenco autorizzazioni di una certa sede
 *       500:
 *         description: Errore interno del server
 */
router.get('/interne/sedi/:idS', requirePermission(permissions.AUTORIZZAZIONI_READ), controller.findAll);

/**
 * @swagger
 * /api/autorizzazioni/interne/sedi/{idS}/search:
 *   get:
 *     summary: Cerca autorizzazione
 *     tags:
 *       - Autorizzazioni
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID della sede
 *       - in: query
 *         name: campo
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - nome
 *             - cognome
 *         description: Campo su cui effettuare la ricerca
 *       - in: query
 *         name: valore
 *         required: true
 *         schema:
 *           type: string
 *         description: Valore da cercare
 *     responses:
 *       200:
 *         description: Elenco autorizzazioni che corrispondono ai parametri
 *       400:
 *         description: Campo di ricerca non valido
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_SEARCH_FIELD
 *                 message: Campo di ricerca non valido
 *       500:
 *         description: Errore interno del server
 */
router.get('/interne/sedi/:idS/search', requirePermission(permissions.AUTORIZZAZIONI_READ), controller.search);

/**
 * @swagger
 * /api/autorizzazioni/interne/{idP}:
 *   post:
 *     summary: Crea una nuova autorizzazione
 *     tags:
 *       - Autorizzazioni
 *     parameters:
 *       - in: path
 *         name: idP
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dataInizio:
 *                 type: string
 *                 format: date
 *               dataScadenza:
 *                 type: string
 *                 format: date
 *               divisione:
 *                 type: integer
 *             required:
 *               - dataScadenza
 *               - dataInizio
 *               - divisione
 *     responses:
 *       201:
 *         description: Autorizzazione creata correttamente
 *       400:
 *         description: Divisione, data inizio e scadenza obbligatorie
 *         content:
 *           application/json:
 *             example:
 *              error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Divisione, data inizio e scadenza obbligatorie
 *       404:
 *         description: Persona interna non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: PERSONA_INTERNA_NOT_FOUND
 *                 message: Persona interna non trovata
 *       500:
 *         description: Errore interno del server
 */
router.post('/interne/:idP', requirePermission(permissions.AUTORIZZAZIONI_WRITE), controller.create);

/**
 * @swagger
 * /api/autorizzazioni/interne/{id}:
 *   put:
 *     summary: Modifica una autorizzazione
 *     tags:
 *       - Autorizzazioni
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dataScadenza:
 *                 type: string
 *                 format: date
 *               divisione:
 *                 type: integer
 *             required:
 *               - dataScadenza
 *               - divisione
 *     responses:
 *       200:
 *         description: Autorizzazione modificata correttamente
 *       400:
 *         description: Data scadenza e divisione sono obbligatorie
 *         content:
 *           application/json:
 *             example:
 *              error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Data scadenza e divisione sono obbligatorie
 *       404:
 *         description: Autorizzazione non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: AUTORIZZAZIONE_NOT_FOUND
 *                 message: Autorizzazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put('/interne/:id', requirePermission(permissions.AUTORIZZAZIONI_WRITE), controller.update);

/**
 * @swagger
 * /api/autorizzazioni/interne/{id}:
 *   delete:
 *     summary: Elimina una autorizzazione
 *     tags:
 *       - Autorizzazioni
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Autorizzazione eliminata correttamente
 *       404:
 *         description: Autorizzazione non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: AUTORIZZAZIONE_NOT_FOUND
 *                 message: Autorizzazione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete('/interne/:id', requirePermission(permissions.AUTORIZZAZIONI_WRITE), controller.remove);

module.exports = router;