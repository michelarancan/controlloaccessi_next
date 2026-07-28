const express = require('express');
const router = express.Router();

const permissions = require('../config/permessi');
const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/chiavi.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/chiavi/sedi/{idS}/non-consegnate:
 *   get:
 *     summary: Restituisce tutte le chiavi di una certa sede non consegnate
 *     tags:
 *       - Chiavi
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elenco chiavi di una certa sede non consegnate
 *       404:
 *         description: Nessuna chiave trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: CHIAVE_NOT_FOUND
 *                 message: Chiave non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get('/sedi/:idS/non-consegnate', requirePermission(permissions.CHIAVI_READ), controller.findAllAroundBySede);

module.exports = router;