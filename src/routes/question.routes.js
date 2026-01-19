const express = require('express');
const { getAllQuestions } = require('../controllers/question.controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getAllQuestions);

module.exports = router;