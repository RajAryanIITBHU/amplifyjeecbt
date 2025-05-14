import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  MousePointer,
} from "lucide-react";
import GeneralInstructions from "./GeneralInstructions";
import SectionInstructions from "./SectionInstructions";
import PreTestConfirmation from "./PreTestConfirmation";

const InstructionScreen = ({
  step,
  isPreTest,
  onNext,
  onPrev,
  onStartTest,
  acceptedTerms,
  setAcceptedTerms,
  userData,
}) => {
  const renderStepContent = () => {
    if (isPreTest) {
      return (
        <PreTestConfirmation
          acceptedTerms={acceptedTerms}
          setAcceptedTerms={setAcceptedTerms}
          userData={userData}
        />
      );
    }

    switch (step) {
      case 1:
        return <GeneralInstructions />;
      case 2:
        return <SectionInstructions />;
      default:
        return <GeneralInstructions />;
    }
  };

  const renderStepIndicator = () => {
    if (isPreTest) return null;

    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            <Clock size={18} />
          </div>
          <div
            className={`w-16 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
          ></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            <BookOpen size={18} />
          </div>
          <div
            className={`w-16 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}
          ></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            <MousePointer size={18} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-gray-900">
      {/* Header */}
      <div className="w-full px-6 bg-gradient-to-r from-blue-700 to-blue-600 text-white py-4 shadow-md">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            {isPreTest ? "Final Confirmation" : "Test Instructions"}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium bg-blue-800 bg-opacity-30 px-3 py-1 rounded-full">
              Roll No: {userData.rollNo}
            </div>
            <div className="text-sm font-medium bg-blue-800 bg-opacity-30 px-3 py-1 rounded-full">
              Candidate: {userData.name}
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="pt-6">{renderStepIndicator()}</div>

      {/* Main Content */}
      <div
        className="w-full flex flex-col gap-6 px-6 py-4 text-sm max-w-4xl mx-auto flex-1 overflow-y-auto"
        style={{
          animation: "fadeIn 0.3s ease-out",
          scrollBehavior: "smooth",
        }}
      >
        {renderStepContent()}
      </div>

      {/* Footer Navigation */}
      <div className="w-full bg-white border-t border-gray-200 py-4 sticky bottom-0 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between px-6">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          {isPreTest ? (
            <button
              onClick={onStartTest}
              disabled={!acceptedTerms}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                acceptedTerms
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              I am Ready to Begin
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Next
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

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

export default InstructionScreen;
