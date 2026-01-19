const express = require('express');
const { 
  upsertAnswer, 
  getUserAnswers, 
  getDreamSummary, 
  deleteAnswer 
} = require('../controllers/answer.controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/', upsertAnswer);
router.get('/', getUserAnswers);
router.get('/dream-summary', getDreamSummary);
router.delete('/:questionId', deleteAnswer);

module.exports = router;