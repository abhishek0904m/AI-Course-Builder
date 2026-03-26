import express from 'express';
import { createRoadmap, explain, createQuiz, searchYouTube } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/roadmap', createRoadmap);
router.post('/explain', explain);
router.post('/quiz', createQuiz);
router.get('/youtube/search', searchYouTube);

export default router;
