import React from "react";
import { AlertTriangle, BookOpen, Beaker, Calculator } from "lucide-react";

const TestHeader = ({
  timeRemaining,
  warnings,
  currentSubject,
  testData,
  onSubjectChange,
  onSectionChange,
}) => {
  // Format time remaining
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get timer color based on time remaining
  const getTimerColor = () => {
    if (timeRemaining <= 300) return "text-red-600 animate-pulse"; // Less than 5 minutes
    if (timeRemaining <= 900) return "text-amber-600"; // Less than 15 minutes
    return "text-green-600";
  };

  // Get icon for subject
  const getSubjectIcon = (subject) => {
    switch (subject.toLowerCase()) {
      case "physics":
        return <Calculator className="w-5 h-5 mr-2" />;
      case "chemistry":
        return <Beaker className="w-5 h-5 mr-2" />;
      case "mathematics":
        return <BookOpen className="w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-blue-700">Test Session</h1>
            <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span className="font-medium text-sm">
                Warnings: {warnings}/3
              </span>
            </div>
          </div>

          <div className={`flex flex-col items-end ${getTimerColor()}`}>
            <div className="text-sm font-medium">Time Remaining</div>
            <div className="text-xl font-mono font-bold">
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {["physics", "chemistry", "mathematics"].map((subject) => {
            if (!testData?.[subject]?.length) return null;

            return (
              <div key={subject} className="flex flex-col min-w-fit">
                <button
                  className={`px-4 py-2 rounded-t-md font-medium transition-colors flex items-center ${
                    currentSubject === subject
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => onSubjectChange(subject)}
                >
                  {getSubjectIcon(subject)}
                  {subject.charAt(0).toUpperCase() + subject.slice(1)}
                </button>

                {currentSubject === subject && (
                  <div className="flex mt-2 space-x-1">
                    {testData[subject].map((section, index) => (
                      <button
                        key={`${subject}-${index}`}
                        className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                          index === 0
                            ? "bg-blue-100 border-blue-300 text-blue-700 font-medium"
                            : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => onSectionChange(index)}
                      >
                        Section {index + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
