"use client"
import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";

const QuestionDisplay = ({
  question,
  sectionType,
  selectedAnswer,
  onAnswer,
}) => {
  const [numericalValue, setNumericalValue] = useState("");

  useEffect(() => {
    if (
      sectionType === "numerical" &&
      selectedAnswer !== undefined &&
      selectedAnswer !== null
    ) {
      setNumericalValue(selectedAnswer.toString());
    } else if (sectionType === "numerical") {
      setNumericalValue("");
    }
  }, [selectedAnswer, sectionType]);

  if (!question) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center h-96 border border-gray-200">
        <p className="text-gray-500 text-lg">No question available</p>
      </div>
    );
  }

  const getMarkingScheme = () => {
    switch (sectionType) {
      case "mcq-single":
        return {
          title: "Single Correct Option",
          marks: "+3 for correct answer",
          negative: "-1 for incorrect answer",
          color: "blue",
        };
      case "mcq-multiple":
        return {
          title: "Multiple Correct Options",
          marks: "+4 for all correct options",
          negative: "-2 for incorrect combination",
          partial:
            "Partial marking: +3 (3 correct), +2 (2 correct), +1 (1 correct)",
          color: "purple",
        };
      case "numerical":
        return {
          title: "Numerical Type",
          marks: "+4 for correct answer",
          negative: "No negative marking",
          color: "green",
        };
      case "matching":
        return {
          title: "Matrix Match Type",
          marks: "+3 for correct match",
          negative: "No negative marking",
          color: "amber",
        };
      default:
        return null;
    }
  };

  const scheme = getMarkingScheme();

  const handleMcqSelect = (optionIndex) => {
    if (sectionType === "mcq-single") {
      onAnswer(question.id, optionIndex);
    } else if (sectionType === "mcq-multiple") {
      const currentSelection = Array.isArray(selectedAnswer)
        ? [...selectedAnswer]
        : [];
      if (currentSelection.includes(optionIndex)) {
        onAnswer(
          question.id,
          currentSelection.filter((i) => i !== optionIndex)
        );
      } else {
        onAnswer(question.id, [...currentSelection, optionIndex]);
      }
    }
  };

  const handleNumericalInput = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumericalValue(value);
      if (value) {
        onAnswer(question.id, parseInt(value, 10));
      } else {
        onAnswer(question.id, null);
      }
    }
  };

  const handleMatchingSelection = (item, matchValue) => {
    const currentMatches = selectedAnswer ? { ...selectedAnswer } : {};
    currentMatches[item] = matchValue;
    onAnswer(question.id, currentMatches);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 min-h-[500px] transform transition-all duration-300"
      style={{ animation: "fadeIn 0.3s ease-out" }}
    >
      {/* Marking Scheme Header */}
      {scheme && (
        <div
          className={`mb-6 rounded-lg border bg-${scheme.color}-50 border-${scheme.color}-200 p-4`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`font-semibold text-${scheme.color}-800 flex items-center`}
            >
              {scheme.title}
            </h3>
            <span
              className={`text-${scheme.color}-700 text-sm font-medium px-3 py-1 bg-${scheme.color}-100 rounded-full`}
            >
              Question {question.number || "1"}
            </span>
          </div>
          <div className={`text-${scheme.color}-700 text-sm space-y-1`}>
            <p>• {scheme.marks}</p>
            <p>• {scheme.negative}</p>
            {scheme.partial && <p>• {scheme.partial}</p>}
          </div>
        </div>
      )}

      {/* Question Content */}
      <div className="mb-6">
        <p className="text-base md:text-lg font-medium whitespace-pre-line leading-relaxed text-gray-800">
          {question.text}
        </p>
        {question.image && (
          <div className="my-5 flex justify-center">
            <img
              src={question.image}
              alt="Question diagram"
              className="max-w-full max-h-80 object-contain rounded-lg border border-gray-200 shadow-md"
            />
          </div>
        )}
      </div>

      {/* Answer Options */}
      {sectionType === "mcq-single" || sectionType === "mcq-multiple" ? (
        <div className="space-y-3">
          {sectionType === "mcq-multiple" && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-blue-800 mb-4 flex items-start">
              <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                This question has multiple correct answers. Select all that
                apply.
              </p>
            </div>
          )}

          {question.options &&
            question.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleMcqSelect(index)}
                className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                  sectionType === "mcq-multiple"
                    ? Array.isArray(selectedAnswer) &&
                      selectedAnswer.includes(index)
                      ? "bg-blue-50 border-blue-300 shadow-sm"
                      : "hover:bg-gray-50 border-gray-200"
                    : selectedAnswer === index
                    ? "bg-blue-50 border-blue-300 shadow-sm"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="mr-4 mt-0.5">
                  <div
                    className={`flex items-center justify-center ${
                      sectionType === "mcq-multiple"
                        ? "h-6 w-6 border-gray-400 rounded-md"
                        : "h-6 w-6 rounded-full border-gray-400"
                    } ${
                      sectionType === "mcq-multiple"
                        ? Array.isArray(selectedAnswer) &&
                          selectedAnswer.includes(index)
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border"
                        : selectedAnswer === index
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border"
                    }`}
                  >
                    {sectionType === "mcq-multiple"
                      ? Array.isArray(selectedAnswer) &&
                        selectedAnswer.includes(index) && (
                          <svg
                            className="h-4 w-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )
                      : selectedAnswer === index && (
                          <div className="h-3 w-3 rounded-full bg-white"></div>
                        )}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="font-medium mr-2 text-gray-800">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-gray-700">{option}</span>
                </div>
              </div>
            ))}
        </div>
      ) : sectionType === "numerical" ? (
        <div className="space-y-4">
          <div className="font-medium text-gray-700">Enter integer answer:</div>
          <input
            type="text"
            value={numericalValue}
            onChange={handleNumericalInput}
            className="w-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-white shadow-sm"
            placeholder="Enter number"
          />
          <p className="text-sm text-gray-500">
            Note: Only non-negative integers are allowed
          </p>
        </div>
      ) : sectionType === "matching" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-800">List I</h3>
              {question.listI &&
                question.listI.map((item, index) => (
                  <div
                    key={`list1-${index}`}
                    className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <span className="font-medium mr-3 text-blue-600">
                      {String.fromCharCode(80 + index)}.
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-800">List II</h3>
              {question.listII &&
                question.listII.map((item, index) => (
                  <div
                    key={`list2-${index}`}
                    className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <span className="font-medium mr-3 text-green-600">
                      {index + 1}.
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
            <h3 className="font-medium mb-4 text-amber-800">
              Match the following:
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {["P", "Q", "R", "S"].map((item) => (
                <div key={item} className="space-y-2">
                  <div className="font-medium text-center text-blue-600">
                    {item}
                  </div>
                  <select
                    value={selectedAnswer?.[item] || ""}
                    onChange={(e) =>
                      handleMatchingSelection(
                        item,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5].map((match) => (
                      <option key={match} value={match}>
                        {match}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Unsupported question type</div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default QuestionDisplay;
