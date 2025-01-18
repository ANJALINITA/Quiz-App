// src/components/ReportPage.js
import React from "react";

const ReportPage = ({ questions, userAnswers }) => {
  return (
    <div className="report-container">
      <h1 className="text-2xl font-bold mb-4">Quiz Report</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Question</th>
            <th className="border border-gray-300 px-4 py-2">Your Answer</th>
            <th className="border border-gray-300 px-4 py-2">Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td className="border border-gray-300 px-4 py-2">{q.question}</td>
              <td
                className={`border border-gray-300 px-4 py-2 ${
                  userAnswers[q.id] === q.correctAnswer ? "text-green-500" : "text-red-500"
                }`}
              >
                {userAnswers[q.id] || "Not Answered"}
              </td>
              <td className="border border-gray-300 px-4 py-2">{q.correctAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
