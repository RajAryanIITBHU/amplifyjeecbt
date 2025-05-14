import React from "react";
import { Clock, AlertTriangle, MousePointer, CheckCircle } from "lucide-react";

const GeneralInstructions = () => {
  return (
    <>
      <h2 className="text-center font-semibold text-2xl text-gray-800 mb-6">
        General Instructions
      </h2>

      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6 hover:shadow-lg transition-shadow duration-300">
        <h3 className="font-medium text-lg mb-4 flex items-center text-blue-700 border-b pb-2">
          <Clock className="w-5 h-5 mr-2" />
          Time Management
        </h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
          <li>
            Total duration of the test is{" "}
            <span className="font-medium text-gray-900">
              3 hours (180 minutes)
            </span>
            .
          </li>
          <li>
            The on-screen countdown timer will display the remaining time
            available to you to complete the exam.
          </li>
          <li>
            When the timer reaches zero, the exam will end automatically and
            your answers will be submitted.
          </li>
          <li>
            The test will be automatically submitted when the time is up—plan
            your time accordingly.
          </li>
        </ol>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6 hover:shadow-lg transition-shadow duration-300">
        <h3 className="font-medium text-lg mb-4 flex items-center text-amber-600 border-b pb-2">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Important Rules
        </h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
          <li>Do not refresh the page or navigate away during the test.</li>
          <li>
            <span className="font-medium text-amber-700">
              Switching tabs or windows
            </span>{" "}
            will result in a warning. Three warnings will lead to automatic test
            submission.
          </li>
          <li>Maintain full-screen mode throughout the test period.</li>
          <li>
            Ensure your device is charged and your internet connection is stable
            before starting.
          </li>
        </ol>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6 hover:shadow-lg transition-shadow duration-300">
        <h3 className="font-medium text-lg mb-4 flex items-center text-blue-700 border-b pb-2">
          <MousePointer className="w-5 h-5 mr-2" />
          Navigation Instructions
        </h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
          <li>
            Use the question palette on the right to navigate between questions.
          </li>
          <li>
            Click "Save & Next" to save your answer and move to the next
            question.
          </li>
          <li>You can mark questions for review and return to them later.</li>
          <li>
            The color coding in the question palette helps track question
            status:
          </li>
        </ol>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center font-medium">
              1
            </div>
            <span className="text-gray-700">Not visited</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="w-10 h-10 bg-red-500 text-white rounded-md flex items-center justify-center font-medium">
              2
            </div>
            <span className="text-gray-700">Visited but not answered</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="w-10 h-10 bg-green-500 text-white rounded-md flex items-center justify-center font-medium">
              3
            </div>
            <span className="text-gray-700">Answered</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-md flex items-center justify-center font-medium">
              4
            </div>
            <span className="text-gray-700">Marked for review</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="relative w-10 h-10 bg-purple-600 text-white rounded-md flex items-center justify-center font-medium">
              5
            <div className="absolute w-3 h-3 rounded-full bg-green-500 -top-1 -right-1"></div>
            </div>
            <span className="text-gray-700">Answered and Marked for review</span>
          </div>
        </div>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <h3 className="font-medium text-lg mb-4 flex items-center text-green-600 border-b pb-2">
          <CheckCircle className="w-5 h-5 mr-2" />
          Answering Questions
        </h3>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>
            For multiple-choice questions, click on the option you believe is
            correct.
          </li>
          <li>
            For multiple-select questions, click on all options you believe are
            correct.
          </li>
          <li>
            For numerical answers, enter your answer in the input field
            provided.
          </li>
          <li>Use the "Clear Response" button to change your answer.</li>
        </ul>
      </section>
    </>
  );
};

export default GeneralInstructions;
