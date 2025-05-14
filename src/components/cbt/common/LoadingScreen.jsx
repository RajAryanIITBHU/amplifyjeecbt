import React from "react";
import { Loader2 } from "lucide-react";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="p-8 bg-white shadow-lg rounded-xl flex flex-col items-center border border-gray-100">
        <div className="mb-6 relative">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-100 opacity-20 animate-ping"></div>
        </div>
        <p className="text-gray-800 font-medium text-lg">{message}</p>
        <p className="text-gray-500 text-sm mt-2">
          Please wait while we prepare your test...
        </p>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
