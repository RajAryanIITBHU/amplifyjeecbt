import React from "react";
import {
  Clock,
  Award,
  BookOpen,
  AlertCircle,
  ChevronRight,
  Download,
  BarChart2,
  Calculator,
  Beaker,
} from "lucide-react";

const ResultScreen = ({ results, userData }) => {
  if (!results) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Results Unavailable
          </h2>
          <p className="text-gray-600">
            There was an issue processing your test results. Please contact
            support.
          </p>
        </div>
      </div>
    );
  }

  // Calculate performance metrics
  const totalQuestions = results.totalAnswered + results.totalUnanswered;
  const accuracy =
    totalQuestions > 0
      ? Math.round((results.totalCorrect / results.totalAnswered) * 100)
      : 0;

  // Section performance
  const sectionPerformance = {
    physics: {
      score: Math.round(results.physics?.marks || 0),
      total: Math.round(results.physics?.total || 0),
      correct: Math.round(results.physics?.correct || 0),
      incorrect: Math.round(results.physics?.incorrect || 0),
      unattempted: Math.round(results.physics?.unattempted || 0),
    },
    chemistry: {
      score: Math.round(results.chemistry?.marks || 0),
      total: Math.round(results.chemistry?.total || 0),
      correct: Math.round(results.chemistry?.correct || 0),
      incorrect: Math.round(results.chemistry?.incorrect || 0),
      unattempted: Math.round(results.chemistry?.unattempted || 0),
    },
    mathematics: {
      score: Math.round(results.mathematics?.marks || 0),
      total: Math.round(results.mathematics?.total || 0),
      correct: Math.round(results.mathematics?.correct || 0),
      incorrect: Math.round(results.mathematics?.incorrect || 0),
      unattempted: Math.round(results.mathematics?.unattempted || 0),
    },
  };

  // Get icon for subjects
  const getSubjectIcon = (subject) => {
    switch (subject.toLowerCase()) {
      case "physics":
        return <Calculator className="w-5 h-5 mr-2 text-blue-600" />;
      case "chemistry":
        return <Beaker className="w-5 h-5 mr-2 text-purple-600" />;
      case "mathematics":
        return <BookOpen className="w-5 h-5 mr-2 text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">Test Results</h1>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <p className="text-blue-100">
                Candidate:{" "}
                <span className="text-white font-medium">{userData.name}</span>
              </p>
              <p className="text-blue-100">
                Roll Number:{" "}
                <span className="text-white font-medium">
                  {userData.rollNo}
                </span>
              </p>
            </div>
            <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium flex items-center self-start md:self-auto hover:bg-blue-50 transition-colors transform hover:scale-[1.02] active:scale-[0.98] shadow-md">
              <Download className="w-4 h-4 mr-2" />
              Download Results PDF
            </button>
          </div>
        </div>
      </div>

      {/* Score Summary */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg border border-blue-100 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="text-4xl font-bold text-blue-700">
                {Math.round(results.marks)}
              </div>
              <div className="text-sm text-blue-600 font-medium mt-1">
                OUT OF {Math.round(results.total)}
              </div>
              <div className="mt-4 text-gray-600 text-sm flex items-center">
                <Award className="w-4 h-4 mr-1" />
                Total Score
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg border border-green-100 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="text-4xl font-bold text-green-700">
                {accuracy}%
              </div>
              <div className="text-sm text-green-600 font-medium mt-1">
                ACCURACY
              </div>
              <div className="mt-4 text-gray-600 text-sm flex items-center">
                <Calculator className="w-4 h-4 mr-1" />
                Correct Answers
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-lg border border-purple-100 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="text-4xl font-bold text-purple-700">
                {results.percentile || "N/A"}
              </div>
              <div className="text-sm text-purple-600 font-medium mt-1">
                PERCENTILE
              </div>
              <div className="mt-4 text-gray-600 text-sm flex items-center">
                <BarChart2 className="w-4 h-4 mr-1" />
                Your Rank
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
          Subject Performance
        </h2>

        {/* Subject-wise Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(sectionPerformance).map(([subject, data]) => (
            <div
              key={subject}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="font-bold text-lg mb-4 capitalize flex items-center border-b pb-2">
                {getSubjectIcon(subject)}
                {subject}
              </h3>

              <div className="flex justify-between items-center mb-4">
                <div className="text-3xl font-bold text-gray-800">
                  {data.score}
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Out of {data.total}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">Correct</span>
                  <span>{data.correct} questions</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 font-medium">Incorrect</span>
                  <span>{data.incorrect} questions</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Unattempted</span>
                  <span>{data.unattempted} questions</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div
                    className="bg-green-500 h-full"
                    style={{
                      width: `${
                        (data.correct /
                          (data.correct + data.incorrect + data.unattempted)) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-red-500 h-full"
                    style={{
                      width: `${
                        (data.incorrect /
                          (data.correct + data.incorrect + data.unattempted)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Time Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center border-b pb-2">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Time Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="text-sm text-gray-500 mb-1">
                Average Time per Question
              </div>
              <div className="text-xl font-bold text-gray-800">
                {results.avgTimePerQuestion || "00:42"}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="text-sm text-gray-500 mb-1">
                Time Spent on Correct Answers
              </div>
              <div className="text-xl font-bold text-gray-800">
                {results.timeOnCorrect || "01:12:34"}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="text-sm text-gray-500 mb-1">
                Time Spent on Incorrect Answers
              </div>
              <div className="text-xl font-bold text-gray-800">
                {results.timeOnIncorrect || "00:47:26"}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-between gap-4">
          <button className="flex items-center px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]">
            <BookOpen className="w-5 h-5 mr-2" />
            View Solutions
          </button>

          <button className="flex items-center px-6 py-3 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]">
            <BarChart2 className="w-5 h-5 mr-2" />
            Detailed Analysis
          </button>

          <button className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]">
            Back to Dashboard
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
