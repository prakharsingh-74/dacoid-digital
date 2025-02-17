import React, { useState, useEffect, useCallback } from 'react';
import { Brain, CheckCircle2, XCircle } from 'lucide-react';
import { questions } from './data/questions';
import { Timer } from './components/Timer';
import { QuizHistory } from './components/QuizHistory';
import { saveAttempt, getAttempts } from './utils/db';
import type { QuizAttempt } from './types';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(Date.now());

  const SECONDS_PER_QUESTION = 30;

  useEffect(() => {
    loadAttempts();
  }, []);

  const loadAttempts = async () => {
    const loadedAttempts = await getAttempts();
    setAttempts(loadedAttempts);
  };

  const handleTimeout = useCallback(() => {
    if (selectedAnswer === null) {
      handleAnswerClick(-1);
    }
  }, [selectedAnswer]);

  const handleAnswerClick = async (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(optionIndex);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    setTimePerQuestion([...timePerQuestion, timeSpent]);

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(async () => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setStartTime(Date.now());
      } else {
        const attempt: QuizAttempt = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          score: score + (optionIndex === questions[currentQuestion].correctAnswer ? 1 : 0),
          totalQuestions: questions.length,
          timePerQuestion: [...timePerQuestion, timeSpent],
        };
        await saveAttempt(attempt);
        await loadAttempts();
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setTimePerQuestion([]);
    setStartTime(Date.now());
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold">Interactive Quiz</h1>
          </div>

          {!showScore ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg">
                  Question {currentQuestion + 1}/{questions.length}
                </p>
                <Timer
                  duration={SECONDS_PER_QUESTION}
                  onTimeout={handleTimeout}
                />
              </div>

              <div className="mb-8">
                <h2 className="text-xl mb-4">{questions[currentQuestion].text}</h2>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 text-left rounded-lg transition-colors ${
                        selectedAnswer === null
                          ? 'hover:bg-indigo-50 border border-gray-200'
                          : selectedAnswer === index
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                          : index === questions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-green-500'
                          : 'border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {selectedAnswer !== null &&
                          index === questions[currentQuestion].correctAnswer && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                        {selectedAnswer === index &&
                          index !== questions[currentQuestion].correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        {option}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-xl mb-6">
                Your score: {score}/{questions.length}
              </p>
              <button
                onClick={restartQuiz}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        <QuizHistory attempts={attempts} />
      </div>
    </div>
  );
}

export default App;