const express = require('express');
const router = express.Router();

const permissions = require('../config/permessi');
const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/badge.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/badge/sedi/{idS}:
 *   get:
 *     summary: Restituisce tutti i badge di una certa sede
 *     tags:
 *       - Badge
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elenco badge di una certa sede
 *       404:
 *         description: Nessun badge trovato
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: BADGE_NOT_FOUND
 *                 message: Badge non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get('/sedi/:idS', requirePermission(permissions.BADGE_READ), controller.findAllBySede);

module.exports = router;