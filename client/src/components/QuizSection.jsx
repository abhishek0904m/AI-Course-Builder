import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import SmoothLoader from './SmoothLoader';

const QuizSection = ({ course, topic, onBack, onComplete, onUpdate }) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const { data } = await api.post('/ai/quiz', {
        topic: course.topic,
        conceptName: topic.name,
        level: course.level
      });
      setQuiz(data);
    } catch (error) {
      toast.error('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionIdx, answer) => {
    setAnswers({ ...answers, [questionIdx]: answer });
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correctCount++;
    });
    
    setScore(correctCount);
    setSubmitted(true);

    try {
      await api.post('/quiz', {
        courseId: course._id,
        topicId: topic.id,
        topicName: topic.name,
        questions: quiz.questions.map((q, idx) => ({
          ...q,
          userAnswer: answers[idx]
        })),
        score: correctCount,
        totalQuestions: quiz.questions.length
      });

      if (correctCount >= quiz.questions.length * 0.6) {
        await api.put(`/course/${course._id}/topic`, {
          courseId: course._id,
          topicId: topic.id,
          status: 'completed'
        });
        onUpdate();
        toast.success('Quiz passed! Topic completed.');
      } else {
        toast.error('Quiz failed. Try again!');
      }
    } catch (error) {
      toast.error('Failed to save quiz results');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <SmoothLoader size="lg" />
      </div>
    );
  }

  if (submitted) {
    const percentage = (score / quiz.questions.length) * 100;
    const passed = percentage >= 60;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className={`text-6xl mb-4 ${passed ? 'text-success' : 'text-error'}`}>
            {passed ? '🎉' : '😔'}
          </div>
          <h2 className="text-3xl font-outfit font-bold mb-4">
            {passed ? 'Congratulations!' : 'Keep Trying!'}
          </h2>
          <p className="text-2xl mb-8">
            Score: <span className="text-indigo-600 font-bold">{score}/{quiz.questions.length}</span>
            {' '}({percentage.toFixed(0)}%)
          </p>

          <div className="space-y-4 text-left mb-8">
            {quiz.questions.map((q, idx) => (
              <div key={idx} className="bg-white-hover p-4 rounded-lg">
                <p className="font-semibold mb-2">{idx + 1}. {q.question}</p>
                <div className="flex items-center space-x-2 mb-1">
                  {answers[idx] === q.correctAnswer ? (
                    <CheckCircle className="text-success" size={20} />
                  ) : (
                    <XCircle className="text-error" size={20} />
                  )}
                  <span>Your answer: {answers[idx] || 'Not answered'}</span>
                </div>
                <div className="text-success">Correct answer: {q.correctAnswer}</div>
                <p className="text-gray-600 text-sm mt-2">{q.explanation}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button onClick={onBack} className="btn-secondary">
              Back to Concept
            </button>
            {passed && (
              <button onClick={onComplete} className="btn-primary">
                Next Concept →
              </button>
            )}
            {!passed && (
              <button onClick={() => { setSubmitted(false); setAnswers({}); }} className="btn-primary">
                Retry Quiz
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span>{Object.keys(answers).length} answered</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-2xl font-outfit font-semibold mb-6">{question.question}</h3>

        <div className="space-y-3 mb-8">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(currentQuestion, option.charAt(0))}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                answers[currentQuestion] === option.charAt(0)
                  ? 'border-accent bg-white-hover'
                  : 'border-gray-200 hover:border-accent'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50"
          >
            ← Previous
          </button>

          {currentQuestion < quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="btn-primary"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < quiz.questions.length}
              className="btn-primary disabled:opacity-50"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizSection;
