import Quiz from '../models/Quiz.js';

export const saveQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create({
      ...req.body,
      userId: req.user._id
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const { courseId } = req.query;
    const query = { userId: req.user._id };
    if (courseId) query.courseId = courseId;
    
    const quizzes = await Quiz.find(query).sort({ takenAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
