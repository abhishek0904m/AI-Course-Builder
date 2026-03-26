import express from 'express';
import { saveQuiz, getQuizzes } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', saveQuiz);
router.get('/', getQuizzes);

export default router;
