import React from "react";
import { Info, HelpCircle } from "lucide-react";

const QuestionNavigation = ({
  testData,
  currentSubject,
  currentSection,
  questionStatus,
  onQuestionSelect,
}) => {
  if (!testData) return null;

  // Get background color for question status
  const getStatusColor = (questionId) => {
    const status = questionStatus[questionId];
    if (!status) return "bg-gray-100 text-gray-700"; // Not visited

    if (status.markedForReview && status.answered)
      return "bg-purple-600 text-white"; // Marked for review & answered
    if (status.markedForReview) return "bg-purple-600 text-white"; // Marked for review
    if (status.answered) return "bg-green-500 text-white"; // Answered
    if (status.visited) return "bg-red-500 text-white"; // Visited but not answered

    return "bg-gray-100 text-gray-700"; // Default
  };

  // Status summary counts
  const getStatusCounts = () => {
    const counts = {
      total: 0,
      notVisited: 0,
      notAnswered: 0,
      answered: 0,
      markedForReview: 0,
    };

    Object.values(questionStatus).forEach((status) => {
      counts.total++;

      if (!status.visited) {
        counts.notVisited++;
      } else if (!status.answered) {
        counts.notAnswered++;
      } else {
        counts.answered++;
      }

      if (status.markedForReview) {
        counts.markedForReview++;
      }
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 h-full flex flex-col">
      <h3 className="p-4 border-b border-gray-200 font-medium text-gray-800 flex items-center">
        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
        Question Navigator
      </h3>

      <div className="overflow-y-auto flex-grow p-4">
        <h4 className="font-medium mb-3 text-sm uppercase text-gray-500 border-b pb-2">
          {currentSubject.charAt(0).toUpperCase() + currentSubject.slice(1)} -
          Section {currentSection + 1}
        </h4>

        <div className="grid grid-cols-5 gap-2 mb-6">
          {testData[currentSubject][currentSection].questions.map(
            (question, index) => {
              const isCurrentQuestion =
                currentSubject === questionStatus[question.id]?.subject &&
                currentSection === questionStatus[question.id]?.sectionIndex &&
                index === question.indexInSection;

              return (
                <button
                  key={question.id}
                  onClick={() =>
                    onQuestionSelect(currentSubject, currentSection, index)
                  }
                  className={`relative w-10 h-10 flex items-center justify-center rounded-md font-medium text-sm shadow-sm hover:shadow-md transition-all transform hover:scale-105 ${getStatusColor(
                    question.id
                  )} ${
                    isCurrentQuestion
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : ""
                  }`}
                >
                  {index + 1}
                  {questionStatus[question.id]?.markedForReview &&
                    questionStatus[question.id]?.answered && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></span>
                    )}
                </button>
              );
            }
          )}
        </div>

        <div className="mb-6 bg-blue-50 p-3 rounded-lg border border-blue-100">
          <h4 className="font-medium text-sm text-blue-800 mb-2 flex items-center">
            <Info className="w-4 h-4 mr-1" />
            Question Summary
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-100 rounded"></div>
              <span className="text-sm text-gray-700">
                Not Visited ({statusCounts.notVisited})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-700">
                Not Answered ({statusCounts.notAnswered})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-700">
                Answered ({statusCounts.answered})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
              <span className="text-sm text-gray-700">
                Marked for Review ({statusCounts.markedForReview})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded relative">
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></span>
              </div>
              <span className="text-sm text-gray-700">Answered & Marked</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-3 text-sm uppercase text-gray-500 border-b pb-2">
            All Sections
          </h4>

          <div className="space-y-4">
            {["physics", "chemistry", "mathematics"].map((subject) => {
              if (!testData[subject]?.length) return null;

              return (
                <div key={subject} className="space-y-2">
                  <h5 className="font-medium capitalize flex items-center text-gray-700">
                    {subject}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {testData[subject].map((section, sectionIndex) => (
                      <button
                        key={`${subject}-${sectionIndex}`}
                        onClick={() =>
                          onQuestionSelect(subject, sectionIndex, 0)
                        }
                        className={`px-3 py-1.5 text-sm rounded-md border transition-all ${
                          currentSubject === subject &&
                          currentSection === sectionIndex
                            ? "bg-blue-100 border-blue-300 text-blue-700 shadow-sm"
                            : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        Section {sectionIndex + 1}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
