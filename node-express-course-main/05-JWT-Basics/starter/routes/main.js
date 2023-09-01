const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth')
const {login, dashboard} = require('../controllers/main')
router.route('/dashboard').get(authentication, dashboard)
router.route('/login').post(login)

module.exports = router;