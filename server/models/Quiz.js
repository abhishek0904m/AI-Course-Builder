import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  topicId: { type: String, required: true },
  topicName: { type: String, required: true },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String,
    explanation: String,
    userAnswer: String
  }],
  score: { type: Number },
  totalQuestions: { type: Number },
  takenAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quiz', quizSchema);
