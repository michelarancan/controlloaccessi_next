const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');

router.get('/me', controller.me);

module.exports = router;