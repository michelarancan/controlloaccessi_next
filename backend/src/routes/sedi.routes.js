const express = require('express');
const router = express.Router();

const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/sedi.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/sedi:
 *   get:
 *     summary: Restituisce tutte le sedi
 *     tags:
 *       - Sedi
 *     responses:
 *       200:
 *         description: Elenco sedi
 *       404:
 *         description: Nessuna sede trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: SEDE_NOT_FOUND
 *                 message: Sede non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get('/', requirePermission('SEDI_READ'), controller.findAll);

/**
 * @swagger
 * /api/sedi/search:
 *   get:
 *     summary: Cerca sede
 *     tags:
 *       - Sedi
 *     parameters:
 *       - in: query
 *         name: campo
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - sede
 *             - ufficio
 *         description: Campo su cui effettuare la ricerca
 *       - in: query
 *         name: valore
 *         required: true
 *         schema:
 *           type: string
 *         description: Valore da cercare
 *     responses:
 *       200:
 *         description: Elenco sedi che corrispondono ai parametri
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
router.get('/search', requirePermission('SEDI_READ'), controller.search);

/**
 * @swagger
 * /api/sedi:
 *   post:
 *     summary: Crea una nuova sede
 *     tags:
 *       - Sedi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sede:
 *                 type: string
 *               ufficio:
 *                 type: string
 *             required:
 *               - sede
 *               - ufficio

 *     responses:
 *       201:
 *         description: Sede creata correttamente
 *       400:
 *         description: Sede e ufficio sono obbligatori
 *         content:
 *           application/json:
 *             example:
 *             error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Sede e ufficio sono obbligatori
 *       500:
 *         description: Errore interno del server
 */
router.post('/', requirePermission('SEDI_WRITE'), controller.create);

/**
 * @swagger
 * /api/sedi/{id}:
 *   put:
 *     summary: Modifica una sede
 *     tags:
 *       - Sedi
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
 *               sede:
 *                 type: string
 *               ufficio:
 *                 type: string
 *             required:
 *               - sede
 *               - ufficio
 *     responses:
 *       200:
 *         description: Sede modificata correttamente
 *       400:
 *         description: Sede e ufficio sono obbligatori
 *         content:
 *           application/json:
 *             example:
 *             error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Sede e ufficio sono obbligatori
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
router.put('/:id', requirePermission('SEDI_WRITE'), controller.update);

/**
 * @swagger
 * /api/sedi/{id}:
 *   delete:
 *     summary: Elimina una sede
 *     tags:
 *       - Sedi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Sede eliminata correttamente
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
router.delete('/:id', requirePermission('SEDI_WRITE'), controller.remove);

module.exports = router;