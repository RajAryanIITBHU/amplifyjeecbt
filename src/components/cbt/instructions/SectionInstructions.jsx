import React from "react";
import { Calculator, BookOpen, Edit3, ListChecks } from "lucide-react";

const SectionInstructions = () => {
  return (
    <>
      <h2 className="text-center font-semibold text-2xl text-gray-800 mb-8">
        Exam Pattern & Marking Scheme
      </h2>

      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6 hover:shadow-lg transition-all duration-300">
        <h3 className="font-bold text-lg mb-4 text-blue-700 border-b pb-3 flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          SECTION 1 (Maximum Marks: 12)
        </h3>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700">
          <li>
            This section contains{" "}
            <span className="font-medium text-gray-900">FOUR (04)</span>{" "}
            questions.
          </li>
          <li>
            Each question has{" "}
            <span className="font-medium text-gray-900">
              FOUR options (A), (B), (C) and (D)
            </span>
            . ONLY ONE is correct.
          </li>
          <li>
            Marking Scheme:
            <table className="border-collapse border border-gray-300 mt-3 w-full text-sm bg-white">
              <tbody>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium w-1/3">
                    Full Marks
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600 font-medium">
                    +3 for correct answer
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Zero Marks
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    0 if unanswered
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Negative Marks
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600 font-medium">
                    -1 for incorrect answer
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ol>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6 hover:shadow-lg transition-all duration-300">
        <h3 className="font-bold text-lg mb-4 text-purple-700 border-b pb-3 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          SECTION 2 (Maximum Marks: 12)
        </h3>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700">
          <li>
            This section contains{" "}
            <span className="font-medium text-gray-900">THREE (03)</span>{" "}
            questions.
          </li>
          <li>
            Each question has{" "}
            <span className="font-medium text-gray-900">FOUR options</span>. ONE
            OR MORE options can be correct.
          </li>
          <li>
            Marking Scheme:
            <table className="border-collapse border border-gray-300 mt-3 w-full text-sm bg-white">
              <thead>
                <tr className="bg-purple-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Scenario
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">
                    All correct options chosen
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-medium">
                    +4
                  </td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-gray-300 px-4 py-3">
                    Partially correct (with no incorrect)
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <div className="text-blue-600 font-medium">
                      +3 (3 correct options)
                    </div>
                    <div className="text-blue-600 mt-1 font-medium">
                      +2 (2 correct options)
                    </div>
                    <div className="text-blue-600 mt-1 font-medium">
                      +1 (1 correct option)
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">
                    Incorrect combination
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-medium">
                    -2
                  </td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-gray-300 px-4 py-3">
                    Unanswered
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    0
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ol>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6 hover:shadow-lg transition-all duration-300">
        <h3 className="font-bold text-lg mb-4 text-green-700 border-b pb-3 flex items-center">
          <Edit3 className="w-5 h-5 mr-2" />
          SECTION 3 (Maximum Marks: 24)
        </h3>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700">
          <li>
            This section contains{" "}
            <span className="font-medium text-gray-900">SIX (06)</span>{" "}
            questions.
          </li>
          <li>
            Answer type:{" "}
            <span className="font-medium text-gray-900">
              Non-negative integer
            </span>{" "}
            only.
          </li>
          <li>
            Marking Scheme:
            <table className="border-collapse border border-gray-300 mt-3 w-full text-sm bg-white">
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium w-1/3">
                    Full Marks
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600 font-medium">
                    +4 for correct integer
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Zero Marks
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    0 for incorrect answer or unanswered
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ol>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
        <h3 className="font-bold text-lg mb-4 text-amber-700 border-b pb-3 flex items-center">
          <ListChecks className="w-5 h-5 mr-2" />
          SECTION 4 (Maximum Marks: 12)
        </h3>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700">
          <li>
            Contains{" "}
            <span className="font-medium text-gray-900">FOUR (04)</span>{" "}
            Matching List Sets.
          </li>
          <li>
            Matching Structure:
            <table className="border-collapse border border-gray-300 mt-3 w-full text-sm bg-white">
              <thead>
                <tr className="bg-amber-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    List-I
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    List-II
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">
                    4 entries (P, Q, R, S)
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    5 entries (1-5)
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
          <li>
            Marking Scheme:
            <table className="border-collapse border border-gray-300 mt-3 w-full text-sm bg-white">
              <tbody>
                <tr className="bg-amber-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium w-1/3">
                    Full Marks
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600 font-medium">
                    +3 for correct combination
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    Zero Marks
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    0 for incorrect answer or unanswered
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ol>
      </section>
    </>
  );
};

export default SectionInstructions;
