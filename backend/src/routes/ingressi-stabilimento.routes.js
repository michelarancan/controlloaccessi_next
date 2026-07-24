const express = require('express');
const router = express.Router();

const permissions = require('../config/permessi');
const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/ingressi-stabilimento.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/ingressi-stabilimento/sedi/{idS}:
 *   get:
 *     summary: Restituisce tutti gli ingressi in una certa sede
 *     tags:
 *       - Ingressi stabilimento
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elenco ingressi in una certa sede
 *       500:
 *         description: Errore interno del server
 */
router.get('/sedi/:idS', requirePermission(permissions.INGRESSI_READ), controller.findAll);

/**
 * @swagger
 * /api/ingressi-stabilimento/sedi/{idS}/periodo:
 *   get:
 *     summary: Restituisce tutti gli ingressi in una certa sede in un certo periodo
 *     tags:
 *       - Ingressi stabilimento
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: inizioPeriodo
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: finePeriodo
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Elenco ingressi in una certa sede in un certo periodo
 *       500:
 *         description: Errore interno del server
 */
router.get('/sedi/:idS/periodo', requirePermission(permissions.INGRESSI_READ), controller.findAllByData);

/**
 * @swagger
 * /api/ingressi-stabilimento/sedi/{idS}/search:
 *   get:
 *     summary: Cerca ingresso
 *     tags:
 *       - Ingressi stabilimento
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
 *             - badge
 *             - targa
 *             - categoria
 *             - personaRiferimento
 *             - azienda
 *             - divisione
 *         description: Campo su cui effettuare la ricerca
 *       - in: query
 *         name: valore
 *         required: true
 *         schema:
 *           type: string
 *         description: Valore da cercare
 *     responses:
 *       200:
 *         description: Elenco ingressi che corrispondono ai parametri
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
router.get('/sedi/:idS/search', requirePermission(permissions.INGRESSI_READ), controller.search);

/**
 * @swagger
 * /api/ingressi-stabilimento/sedi/{idS}/search/periodo:
 *   get:
 *     summary: Cerca ingresso in un certo periodo
 *     tags:
 *       - Ingressi stabilimento
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
 *             - badge
 *             - targa
 *             - categoria
 *             - personaRiferimento
 *             - azienda
 *             - divisione
 *         description: Campo su cui effettuare la ricerca
 *       - in: query
 *         name: valore
 *         required: true
 *         schema:
 *           type: string
 *         description: Valore da cercare
 *       - in: query
 *         name: inizioPeriodo
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: finePeriodo
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Elenco ingressi che corrispondono ai parametri
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
router.get('/sedi/:idS/search/periodo', requirePermission(permissions.INGRESSI_READ), controller.searchByData);

/**
 * @swagger
 * /api/ingressi-stabilimento/sedi/{idS}:
 *   post:
 *     summary: Aggiunge un nuovo ingresso
 *     tags:
 *       - Ingressi stabilimento
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID della sede
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               persona:
 *                 type: integer
 *               badge:
 *                 type: integer
 *               targa:
 *                 type: string
 *               categoria:
 *                 type: integer
 *               personaRiferimento:
 *                 type: integer
 *               divisione:
 *                 type: integer
 *             required:
 *               - persona
 *               - badge
 *               - categoria
 *               - divisione
 *     responses:
 *       201:
 *         description: Ingresso aggiunto correttamente
 *       400:
 *         description: Persona, badge, categoria e divisione di destinazione sono obbligatori
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Persona, badge, categoria e divisione di destinazione sono obbligatori
 *       500:
 *         description: Errore interno del server
 */
router.post('/sedi/:idS', requirePermission(permissions.INGRESSI_WRITE), controller.create);

/**
 * @swagger
 * /api/ingressi-stabilimento/{id}/uscita:
 *   put:
 *     summary: Registra l'uscita dalla sede
 *     tags:
 *       - Ingressi stabilimento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Uscita registrata correttamente
 *       400:
 *         description: Uscita già registrata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: ACCESS_ALREADY_CLOSED
 *                 message: Uscita già registrata
 *       500:
 *         description: Errore interno del server
 */
router.put('/:id/uscita', requirePermission(permissions.INGRESSI_WRITE), controller.registerExit);

module.exports = router;