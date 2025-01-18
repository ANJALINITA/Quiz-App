import React, { useState, useEffect } from "react";

const QuizPage = ({ questions, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      handleSubmit();
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const navigateToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index);
      if (!visitedQuestions.includes(index)) {
        setVisitedQuestions((prev) => [...prev, index]);
      }
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="quiz-container">
      <div className="timer text-right text-red-500 font-bold">
        Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="overview-panel mt-4 flex justify-center gap-2 flex-wrap">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToQuestion(index)}
            className={`overview-button px-3 py-1 rounded text-sm ${
              currentQuestion === index
                ? "bg-blue-500 text-white"
                : visitedQuestions.includes(index)
                ? "bg-green-300"
                : "bg-gray-300"
            }`}
          >
            Q{index + 1}
          </button>
        ))}
      </div>
      <div className="question-container mt-4">
        <h2 className="question text-xl font-semibold mb-4">
          {`Q${currentQuestion + 1}. ${questions[currentQuestion]?.question}`}
        </h2>
        <div className="options mb-6">
          {questions[currentQuestion]?.options.map((option, idx) => (
            <div key={idx} className="option mb-2">
              <label className="block">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={answers[questions[currentQuestion].id] === option}
                  onChange={() => handleAnswerChange(questions[currentQuestion].id, option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="navigation-buttons flex justify-between mt-6">
        <button
          onClick={() => navigateToQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0}
          className={`prev-button px-4 py-2 rounded ${
            currentQuestion === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => navigateToQuestion(currentQuestion + 1)}
          disabled={currentQuestion === questions.length - 1}
          className={`next-button px-4 py-2 rounded ${
            currentQuestion === questions.length - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
      <div className="submit-button-container text-center mt-8">
        <button
          onClick={handleSubmit}
          className="submit-button px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
