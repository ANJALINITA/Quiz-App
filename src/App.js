import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizPage from "./components/QuizPage";
import ReportPage from "./components/ReportPage";
import "./App.css";

const App = () => {
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=15");
      const formattedQuestions = response.data.results.map((q, index) => ({
        id: index + 1,
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        correctAnswer: q.correct_answer,
      }));
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("userEmail", email);
    }
  };

  const handleQuizSubmit = (answers) => {
    setUserAnswers(answers);
    setQuizSubmitted(true);
  };

  return (
    <div className="app-container min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="app-header w-full bg-blue-600 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">Quiz App</h1>
      </header>
      <main className="flex-1 w-full max-w-3xl p-6 bg-white shadow-md rounded-lg">
        {!email ? (
          <div className="email-form  items-center justify-center ">
            <form onSubmit={handleEmailSubmit} className="form-container">
              <label htmlFor="email" className="email-label block mb-2 text-sm font-medium text-gray-900">
                Enter your email:
              </label>
              <input
                type="email"
                id="email"
                className="email-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="start-button mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Start Quiz
              </button>
            </form>
          </div>
        ) : loading ? (
          <div className="loading-spinner text-center mt-8">
            <div className="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
            <p className="mt-4 text-gray-500">Fetching quiz data, please wait...</p>
          </div>
        ) : quizSubmitted ? (
          <ReportPage questions={questions} userAnswers={userAnswers} />
        ) : (
          <QuizPage questions={questions} onSubmit={handleQuizSubmit} />
        )}
      </main>
      <footer className="app-footer w-full text-center py-4 text-sm text-gray-500">
        © 2025 Quiz App. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
