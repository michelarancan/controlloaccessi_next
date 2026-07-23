const express = require('express');
const router = express.Router();

const permissions = require('../config/permessi');
const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/persone.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/persone/interne/sedi/{idS}:
 *   get:
 *     summary: Restituisce tutte le persone interne di una certa sede
 *     tags:
 *       - Persone interne
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elenco persone interne di una certa sede
 *       500:
 *         description: Errore interno del server
 */
router.get('/interne/sedi/:idS', requirePermission(permissions.PERSONE_INTERNE_READ), controller.findAllInterne);

/**
 * @swagger
 * /api/persone/interne/divisioni/{idD}:
 *   get:
 *     summary: Restituisce tutte le persone interne di una certa divisione
 *     tags:
 *       - Persone interne
 *     parameters:
 *       - in: path
 *         name: idD
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elenco persone interne di una certa divisione
 *       500:
 *         description: Errore interno del server
 */
router.get('/interne/divisioni/:idD', requirePermission(permissions.PERSONE_INTERNE_READ), controller.findAllInterneByDivisione);

/**
 * @swagger
 * /api/persone/interne/sedi/{idS}/search:
 *   get:
 *     summary: Cerca persona interna
 *     tags:
 *       - Persone interne
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
 *             - telefono
 *             - email
 *         description: Campo su cui effettuare la ricerca
 *       - in: query
 *         name: valore
 *         required: true
 *         schema:
 *           type: string
 *         description: Valore da cercare
 *     responses:
 *       200:
 *         description: Elenco persone interne che corrispondono ai parametri
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
router.get('/interne/sedi/:idS/search', requirePermission(permissions.PERSONE_INTERNE_READ), controller.searchInterna);

/**
 * @swagger
 * /api/persone/interne/divisioni/{idD}/search:
 *   get:
 *     summary: Cerca persona interna in una divisione
 *     tags:
 *       - Persone interne
 *     parameters:
 *       - in: path
 *         name: idD
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID della divisione
 *       - in: query
 *         name: campo
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - nome
 *             - cognome
 *             - telefono
 *             - email
 *         description: Campo su cui effettuare la ricerca
 *       - in: query
 *         name: valore
 *         required: true
 *         schema:
 *           type: string
 *         description: Valore da cercare
 *     responses:
 *       200:
 *         description: Elenco persone interne che corrispondono ai parametri
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
router.get('/interne/divisioni/:idD/search', requirePermission(permissions.PERSONE_INTERNE_READ), controller.searchInternaByDivisione);

/**
 * @swagger
 * /api/persone/interne/sedi/{idS}:
 *   post:
 *     summary: Crea una nuova persona interna
 *     tags:
 *       - Persone interne
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
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               divisione:
 *                 type: integer
 *             required:
 *               - nome
 *               - cognome
 *               - telefono
 *               - divisione
 *     responses:
 *       201:
 *         description: Persona interna creata correttamente
 *       400:
 *         description: Nome, cognome, telefono e divisione sono obbligatori
 *         content:
 *           application/json:
 *             example:
 *             error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Nome, cognome, telefono e divisione sono obbligatori
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
router.post('/interne/sedi/:idS', requirePermission(permissions.PERSONE_INTERNE_WRITE), controller.createInterna);

/**
 * @swagger
 * /api/persone/interne/{id}/sedi/{idS}:
 *   put:
 *     summary: Modifica una persona interna
 *     tags:
 *       - Persone interne
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
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
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               divisione:
 *                 type: integer
 *             required:
 *               - nome
 *               - cognome
 *               - telefono
 *               - divisione
 *     responses:
 *       200:
 *         description: Persona interna modificata correttamente
 *       400:
 *         description: Nome, cognome, telefono e divisione sono obbligatori
 *         content:
 *           application/json:
 *             example:
 *             error:
 *                code: INVALID_PARAMS_FIELD
 *                message: Nome, cognome, telefono e divisione sono obbligatori
 *       404:
 *         description: Persona interna o sede non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: PERSONA_INTERNA_NOT_FOUND
 *                 message: Persona interna non trovata
 *       500:
 *         description: Errore interno del server
 */
router.put('/interne/:id/sedi/:idS/', requirePermission(permissions.PERSONE_INTERNE_WRITE), controller.updateInterna);

/**
 * @swagger
 * /api/persone/{id}:
 *   delete:
 *     summary: Elimina una persona
 *     tags:
 *       - Persone
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Persona eliminata correttamente
 *       404:
 *         description: Persona non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: PERSONA_NOT_FOUND
 *                 message: Persona non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete('/:id', requirePermission(permissions.PERSONE_INTERNE_WRITE), controller.remove);

module.exports = router;