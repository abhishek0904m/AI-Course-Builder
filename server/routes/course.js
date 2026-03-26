import express from 'express';
import { createCourse, getCourses, getCourse, updateCourse, updateTopicStatus, deleteCourse } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createCourse);
router.get('/', getCourses);
router.get('/:id', getCourse);
router.put('/:id', updateCourse);
router.put('/:id/topic', updateTopicStatus);
router.delete('/:id', deleteCourse);

export default router;
