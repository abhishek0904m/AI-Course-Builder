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
        <div className="bg-white border border-[#E2E8F0] rounded-3xl shadow-xl p-10 text-center">
          <div className={`text-7xl mb-6 ${passed ? 'drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]'}`}>
            {passed ? '🏆' : '🕯️'}
          </div>
          <h2 className="text-3xl font-outfit font-bold mb-4 text-[#0F172A]">
            {passed ? 'Codex Unified' : 'Focus Required'}
          </h2>
          <p className="text-2xl mb-10 text-[#475569]">
            Mastery: <span className="text-[#F59E0B] font-black">{score}/{quiz.questions.length}</span>
            {' '}({percentage.toFixed(0)}%)
          </p>

          <div className="space-y-6 text-left mb-10">
            {quiz.questions.map((q, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl">
                <p className="font-bold text-[#0F172A] mb-4">{idx + 1}. {q.question}</p>
                <div className="flex items-center space-x-3 mb-2">
                  {answers[idx] === q.correctAnswer ? (
                    <CheckCircle className="text-[#10B981]" size={20} />
                  ) : (
                    <XCircle className="text-[#EF4444]" size={20} />
                  )}
                  <span className={answers[idx] === q.correctAnswer ? "text-[#10B981] font-bold" : "text-[#EF4444] font-bold"}>
                    Identity: {answers[idx] || 'Silence'}
                  </span>
                </div>
                <div className="text-[#F59E0B] font-bold text-sm uppercase tracking-widest mt-2 border-t border-[#E2E8F0] pt-4">
                  True Path: {q.correctAnswer}
                </div>
                <p className="text-[#475569] text-sm mt-3 leading-relaxed italic">{q.explanation}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button onClick={onBack} className="px-8 py-3 bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] rounded-xl font-bold hover:text-[#0F172A] transition-colors">
              Re-Study
            </button>
            {passed && (
              <button onClick={onComplete} className="px-8 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl font-bold shadow-lg">
                Ascend →
              </button>
            )}
            {!passed && (
              <button onClick={() => { setSubmitted(false); setAnswers({}); }} className="px-8 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl font-bold shadow-lg">
                Re-Try
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
      <div className="bg-white border border-[#E2E8F0] rounded-3xl shadow-xl p-10">
        <div className="mb-10">
          <div className="flex justify-between text-sm text-[#475569] mb-3 font-bold uppercase tracking-widest">
            <span>Ritual {currentQuestion + 1} of {quiz.questions.length}</span>
            <span className="text-[#F59E0B]">{Object.keys(answers).length} Locked</span>
          </div>
          <div className="w-full bg-[#F8FAFC] rounded-full h-3 overflow-hidden border border-[#E2E8F0]">
            <div 
              className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-2xl font-outfit font-bold mb-10 text-[#0F172A] leading-tight">{question.question}</h3>

        <div className="space-y-4 mb-10">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(currentQuestion, option.charAt(0))}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 font-semibold text-lg ${
                answers[currentQuestion] === option.charAt(0)
                  ? 'border-[#F59E0B] bg-[#F59E0B]/5 text-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.05)]'
                  : 'border-[#E2E8F0] hover:border-[#F59E0B]/30 text-[#475569] bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs border ${
                    answers[currentQuestion] === option.charAt(0) ? 'bg-[#F59E0B] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                }`}>
                  {option.charAt(0)}
                </span>
                <span>{option.substring(3)}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-12 pt-8 border-t border-[#E2E8F0]">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-8 py-3 bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] rounded-xl font-bold disabled:opacity-30 transition-all font-outfit"
          >
            ← Previous
          </button>

          {currentQuestion < quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-10 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl font-bold shadow-lg transition-all"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < quiz.questions.length}
              className="px-10 py-3 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white rounded-xl font-black shadow-xl disabled:opacity-50 transition-all"
            >
              SUBMIT CODE
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizSection;
