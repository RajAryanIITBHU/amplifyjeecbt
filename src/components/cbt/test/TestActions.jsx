import React from "react";
import { ChevronLeft, ChevronRight, Flag, X, Save } from "lucide-react";

const TestActions = ({
  onPrevious,
  onNext,
  onClear,
  onMarkForReview,
  onEndTest,
  isMarkedForReview,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-4 z-10">
      <div className="container mx-auto px-4 flex justify-between">
        <div className="flex space-x-3">
          <button
            onClick={onPrevious}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg flex items-center space-x-1 hover:bg-gray-200 transition-colors shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <ChevronLeft size={18} />
            <span>Previous</span>
          </button>

          <button
            onClick={onClear}
            className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg flex items-center space-x-1 hover:bg-red-100 transition-colors shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <X size={18} />
            <span>Clear Response</span>
          </button>

          <button
            onClick={onMarkForReview}
            className={`px-4 py-2.5 rounded-lg flex items-center space-x-1 transition-colors shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98] ${
              isMarkedForReview
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-purple-50 text-purple-600 hover:bg-purple-100"
            }`}
          >
            <Flag size={18} />
            <span>
              {isMarkedForReview ? "Marked for Review" : "Mark for Review"}
            </span>
          </button>

          <button
            onClick={onNext}
            className="px-4 py-2.5 bg-green-600 text-white rounded-lg flex items-center space-x-1 hover:bg-green-700 transition-colors shadow-sm hover:shadow transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save size={18} className="mr-1" />
            <span>Save & Next</span>
            <ChevronRight size={18} />
          </button>
        </div>

        <button
          onClick={onEndTest}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default TestActions;
