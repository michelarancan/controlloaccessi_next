const express = require('express');
const router = express.Router();

const controller = require('../controllers/operatori.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/operatori/sedi/{idS}:
 *   get:
 *     summary: Restituisce tutti gli operatori di una certa sede
 *     tags:
 *       - Operatori
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elenco operatori di una certa sede
 *       404:
 *         description: Nessun operatore trovato
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: OPERATORE_NOT_FOUND
 *                 message: Operatore non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get('/sedi/:idS', controller.findAll);

/**
 * @swagger
 * /api/operatori/sedi/{idS}/search:
 *   get:
 *     summary: Cerca operatore
 *     tags:
 *       - Operatori
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
 *         description: Elenco operatori che corrispondono ai parametri
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
router.get('/sedi/:idS/search', controller.search);

/**
 * @swagger
 * /api/operatori/sedi/{idS}:
 *   post:
 *     summary: Crea un nuovo operatore
 *     tags:
 *       - Operatori
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cognome:
 *                 type: string
 *             required:
 *               - nome
 *               - cognome
 *     responses:
 *       201:
 *         description: Operatore creato correttamente
 *       400:
 *         description: Nome e cognome sono obbligatori
 *         content:
 *           application/json:
 *             example:
 *             error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Nome e cognome sono obbligatori
 *       404:
 *         description: Sede non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: SEDE_NOT_FOUND
 *                 message: Sede non trovata
 *       500:
 *         description: Errore interno del server
 */
router.post('/sedi/:idS', controller.create);

/**
 * @swagger
 * /api/operatori/{id}:
 *   put:
 *     summary: Modifica un operatore
 *     tags:
 *       - Operatori
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
 *               nome:
 *                 type: string
 *               cognome:
 *                 type: string
 *             required:
 *               - nome
 *               - cognome
 *     responses:
 *       204:
 *         description: Operatore modificato correttamente
 *       400:
 *         description: Nome e cognome sono obbligatori
 *         content:
 *           application/json:
 *             example:
 *             error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Nome e cognome sono obbligatori
 *       404:
 *         description: Operatore non trovato
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: OPERATORE_NOT_FOUND
 *                 message: Operatore non trovato
 *       500:
 *         description: Errore interno del server
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/operatori/{id}:
 *   delete:
 *     summary: Elimina un operatore
 *     tags:
 *       - Operatori
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Operatore eliminato correttamente
 *       404:
 *         description: Operatore non trovato
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: OPERATORE_NOT_FOUND
 *                 message: Operatore non trovato
 *       500:
 *         description: Errore interno del server
 */
router.delete('/:id', controller.remove);

module.exports = router;