const express = require('express');
const router = express.Router();

const permissions = require('../config/permessi');
const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/report.controller');

/**
 * @swagger
 * /api/report/accessi-giornalieri/sedi/{idS}:
 *   get:
 *     summary: Restituisce tutti gli ingressi in una certa sede in un certo giorno
 *     tags:
 *       - Report
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: data
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Elenco ingressi in una certa sede in un certo giorno
 *       500:
 *         description: Errore interno del server
 */
router.get('/accessi-giornalieri/sedi/:idS', requirePermission(permissions.REPORT_READ), controller.findAllByData);

/**
 * @swagger
 * /api/report/accessi-giornalieri/sedi/{idS}/pdf:
 *   get:
 *     summary: Genera pdf per il report
 *     tags:
 *       - Report
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: data
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Pdf generato correttamente
 *       500:
 *         description: Errore interno del server
 */
router.get('/accessi-giornalieri/sedi/:idS/pdf', requirePermission(permissions.REPORT_WRITE), controller.generatePdf);

module.exports = router;