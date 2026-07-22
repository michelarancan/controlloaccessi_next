const express = require('express');
const router = express.Router();

const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/persone-autorizzate-interne.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/persone-autorizzate-interne/sedi/{idS}:
 *   get:
 *     summary: Restituisce tutte le persone autorizzate interne di una certa sede
 *     tags:
 *       - Persone autorizzate interne
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elenco persone autorizzate interne di una certa sede
 *       500:
 *         description: Errore interno del server
 */
router.get('/sedi/:idS', requirePermission('PERSONE_AUTORIZZATE_INTERNE_READ'), controller.findAll);

/**
 * @swagger
 * /api/persone-autorizzate-interne/sedi/{idS}/search:
 *   get:
 *     summary: Cerca persona autorizzata interna
 *     tags:
 *       - Persone autorizzate interne
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
 *         description: Elenco persone autorizzate interne che corrispondono ai parametri
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
router.get('/sedi/:idS/search', requirePermission('PERSONE_AUTORIZZATE_INTERNE_READ'), controller.search);

/**
 * @swagger
 * /api/persone-autorizzate-interne/persone-interne/{idP}:
 *   post:
 *     summary: Crea una nuova persona autorizzata interna
 *     tags:
 *       - Persone autorizzate interne
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
 *               dataScadenza:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - dataScadenza
 *     responses:
 *       201:
 *         description: Persona autorizzata interna creata correttamente
 *       400:
 *         description: Data scadenza è obbligatoria
 *         content:
 *           application/json:
 *             example:
 *             error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Data scadenza è obbligatoria
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
router.post('/persone-interne/:idP', requirePermission('PERSONE_AUTORIZZATE_INTERNE_WRITE'), controller.create);

/**
 * @swagger
 * /api/persone-autorizzate-interne/{id}:
 *   put:
 *     summary: Modifica una persona autorizzata interna
 *     tags:
 *       - Persone autorizzate interne
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
 *                 format: date-time
 *             required:
 *               - dataScadenza
 *     responses:
 *       200:
 *         description: Persona autorizzata interna modificata correttamente
 *       400:
 *         description: Data scadenza è obbligatoria
 *         content:
 *           application/json:
 *             example:
 *             error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Data scadenza è obbligatoria
 *       404:
 *         description: Persona autorizzata interna non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: PERSONA_AUTORIZZATA_INTERNA_NOT_FOUND
 *                 message: Persona autorizzata interna non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put('/:id', requirePermission('PERSONE_AUTORIZZATE_INTERNE_WRITE'), controller.update);

/**
 * @swagger
 * /api/persone-autorizzate-interne/{id}:
 *   delete:
 *     summary: Elimina una persona autorizzata interna
 *     tags:
 *       - Persone autorizzate interne
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Persona autorizzata interna eliminata correttamente
 *       404:
 *         description: Persona autorizzata interna non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: PERSONA_AUTORIZZATA_INTERNA_NOT_FOUND
 *                 message: Persona autorizzata interna non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete('/:id', requirePermission('PERSONE_AUTORIZZATE_INTERNE_WRITE'), controller.remove);

module.exports = router;