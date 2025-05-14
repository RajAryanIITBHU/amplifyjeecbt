import React, { useState } from "react";
import { Save, Plus, Trash2, MoveUp, MoveDown } from "lucide-react";

const PaperEditor = () => {
  const [paperDetails, setPaperDetails] = useState({
    title: "",
    subject: "physics",
    duration: 180,
    instructions: "",
    sections: [],
  });

  const addSection = () => {
    const newSection = {
      id: Date.now().toString(),
      name: `Section ${paperDetails.sections.length + 1}`,
      type: "mcq-single",
      marks: 4,
      negative: 1,
      questions: [],
    };
    setPaperDetails((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const addQuestion = (sectionId) => {
    const newQuestion = {
      id: Date.now().toString(),
      text: "",
      options: ["", "", "", ""],
      correctOption: 0,
    };

    setPaperDetails((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, questions: [...section.questions, newQuestion] }
          : section
      ),
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Paper Details */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Paper Editor</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm">
            <Save size={20} />
            Save Paper
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paper Title
            </label>
            <input
              type="text"
              value={paperDetails.title}
              onChange={(e) =>
                setPaperDetails((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter paper title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={paperDetails.subject}
              onChange={(e) =>
                setPaperDetails((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="mathematics">Mathematics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={paperDetails.duration}
              onChange={(e) =>
                setPaperDetails((prev) => ({
                  ...prev,
                  duration: parseInt(e.target.value),
                }))
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            <textarea
              value={paperDetails.instructions}
              onChange={(e) =>
                setPaperDetails((prev) => ({
                  ...prev,
                  instructions: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter paper instructions"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Sections</h3>
          <button
            onClick={addSection}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={20} />
            Add Section
          </button>
        </div>

        {paperDetails.sections.map((section, index) => (
          <div
            key={section.id}
            className="border border-gray-200 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={section.name}
                  onChange={(e) => {
                    setPaperDetails((prev) => ({
                      ...prev,
                      sections: prev.sections.map((s) =>
                        s.id === section.id ? { ...s, name: e.target.value } : s
                      ),
                    }));
                  }}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={section.type}
                  onChange={(e) => {
                    setPaperDetails((prev) => ({
                      ...prev,
                      sections: prev.sections.map((s) =>
                        s.id === section.id ? { ...s, type: e.target.value } : s
                      ),
                    }));
                  }}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="mcq-single">Single Correct MCQ</option>
                  <option value="mcq-multiple">Multiple Correct MCQ</option>
                  <option value="numerical">Numerical</option>
                  <option value="matching">Matrix Match</option>
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={section.marks}
                    onChange={(e) => {
                      setPaperDetails((prev) => ({
                        ...prev,
                        sections: prev.sections.map((s) =>
                          s.id === section.id
                            ? { ...s, marks: parseInt(e.target.value) }
                            : s
                        ),
                      }));
                    }}
                    className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Marks"
                  />
                  <span className="text-sm text-gray-600">marks</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={section.negative}
                    onChange={(e) => {
                      setPaperDetails((prev) => ({
                        ...prev,
                        sections: prev.sections.map((s) =>
                          s.id === section.id
                            ? { ...s, negative: parseInt(e.target.value) }
                            : s
                        ),
                      }));
                    }}
                    className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Negative"
                  />
                  <span className="text-sm text-gray-600">negative</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoveUp size={18} className="text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoveDown size={18} className="text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {section.questions.map((question, qIndex) => (
                <div
                  key={question.id}
                  className="border border-gray-100 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-medium text-gray-700">
                      Question {qIndex + 1}
                    </span>
                    <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>

                  <textarea
                    value={question.text}
                    onChange={(e) => {
                      setPaperDetails((prev) => ({
                        ...prev,
                        sections: prev.sections.map((s) =>
                          s.id === section.id
                            ? {
                                ...s,
                                questions: s.questions.map((q) =>
                                  q.id === question.id
                                    ? { ...q, text: e.target.value }
                                    : q
                                ),
                              }
                            : s
                        ),
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    rows={3}
                    placeholder="Enter question text"
                  />

                  {(section.type === "mcq-single" ||
                    section.type === "mcq-multiple") && (
                    <div className="space-y-2">
                      {question.options?.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type={
                              section.type === "mcq-single"
                                ? "radio"
                                : "checkbox"
                            }
                            checked={
                              section.type === "mcq-single"
                                ? question.correctOption === optIndex
                                : question.correctOptions?.includes(optIndex)
                            }
                            onChange={() => {
                              setPaperDetails((prev) => ({
                                ...prev,
                                sections: prev.sections.map((s) =>
                                  s.id === section.id
                                    ? {
                                        ...s,
                                        questions: s.questions.map((q) =>
                                          q.id === question.id
                                            ? section.type === "mcq-single"
                                              ? {
                                                  ...q,
                                                  correctOption: optIndex,
                                                }
                                              : {
                                                  ...q,
                                                  correctOptions:
                                                    q.correctOptions?.includes(
                                                      optIndex
                                                    )
                                                      ? q.correctOptions.filter(
                                                          (i) => i !== optIndex
                                                        )
                                                      : [
                                                          ...(q.correctOptions ||
                                                            []),
                                                          optIndex,
                                                        ],
                                                }
                                            : q
                                        ),
                                      }
                                    : s
                                ),
                              }));
                            }}
                            className="w-4 h-4"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              setPaperDetails((prev) => ({
                                ...prev,
                                sections: prev.sections.map((s) =>
                                  s.id === section.id
                                    ? {
                                        ...s,
                                        questions: s.questions.map((q) =>
                                          q.id === question.id
                                            ? {
                                                ...q,
                                                options: q.options?.map(
                                                  (opt, i) =>
                                                    i === optIndex
                                                      ? e.target.value
                                                      : opt
                                                ),
                                              }
                                            : q
                                        ),
                                      }
                                    : s
                                ),
                              }));
                            }}
                            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Option ${optIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === "numerical" && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Correct Answer:
                      </span>
                      <input
                        type="number"
                        value={question.correctAnswer}
                        onChange={(e) => {
                          setPaperDetails((prev) => ({
                            ...prev,
                            sections: prev.sections.map((s) =>
                              s.id === section.id
                                ? {
                                    ...s,
                                    questions: s.questions.map((q) =>
                                      q.id === question.id
                                        ? {
                                            ...q,
                                            correctAnswer: parseInt(
                                              e.target.value
                                            ),
                                          }
                                        : q
                                    ),
                                  }
                                : s
                            ),
                          }));
                        }}
                        className="w-32 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {section.type === "matching" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          List I
                        </h4>
                        {["P", "Q", "R", "S"].map((item, index) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 mb-2"
                          >
                            <span className="font-medium text-blue-600">
                              {item}.
                            </span>
                            <input
                              type="text"
                              value={question.listI?.[index] || ""}
                              onChange={(e) => {
                                setPaperDetails((prev) => ({
                                  ...prev,
                                  sections: prev.sections.map((s) =>
                                    s.id === section.id
                                      ? {
                                          ...s,
                                          questions: s.questions.map((q) =>
                                            q.id === question.id
                                              ? {
                                                  ...q,
                                                  listI: (q.listI || []).map(
                                                    (val, i) =>
                                                      i === index
                                                        ? e.target.value
                                                        : val
                                                  ),
                                                }
                                              : q
                                          ),
                                        }
                                      : s
                                  ),
                                }));
                              }}
                              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={`Item ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          List II
                        </h4>
                        {[1, 2, 3, 4, 5].map((item, index) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 mb-2"
                          >
                            <span className="font-medium text-green-600">
                              {item}.
                            </span>
                            <input
                              type="text"
                              value={question.listII?.[index] || ""}
                              onChange={(e) => {
                                setPaperDetails((prev) => ({
                                  ...prev,
                                  sections: prev.sections.map((s) =>
                                    s.id === section.id
                                      ? {
                                          ...s,
                                          questions: s.questions.map((q) =>
                                            q.id === question.id
                                              ? {
                                                  ...q,
                                                  listII: (q.listII || []).map(
                                                    (val, i) =>
                                                      i === index
                                                        ? e.target.value
                                                        : val
                                                  ),
                                                }
                                              : q
                                          ),
                                        }
                                      : s
                                  ),
                                }));
                              }}
                              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={`Match ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="col-span-2">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Correct Matches
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          {["P", "Q", "R", "S"].map((item) => (
                            <div key={item}>
                              <label className="block text-sm text-gray-600 mb-1">
                                {item} matches with:
                              </label>
                              <select
                                value={question.correctMatches?.[item] || ""}
                                onChange={(e) => {
                                  setPaperDetails((prev) => ({
                                    ...prev,
                                    sections: prev.sections.map((s) =>
                                      s.id === section.id
                                        ? {
                                            ...s,
                                            questions: s.questions.map((q) =>
                                              q.id === question.id
                                                ? {
                                                    ...q,
                                                    correctMatches: {
                                                      ...(q.correctMatches ||
                                                        {}),
                                                      [item]: parseInt(
                                                        e.target.value
                                                      ),
                                                    },
                                                  }
                                                : q
                                            ),
                                          }
                                        : s
                                    ),
                                  }));
                                }}
                                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">Select</option>
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => addQuestion(section.id)}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus size={20} className="inline-block mr-2" />
                Add Question
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaperEditor;
