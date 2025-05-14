import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  Fingerprint,
  Laptop,
  Wifi,
  Clock,
} from "lucide-react";

const PreTestConfirmation = ({ acceptedTerms, setAcceptedTerms, userData }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-center font-semibold text-2xl text-gray-800 mb-6">
          Final Check Before Starting Your Test
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
          <h3 className="font-medium text-lg mb-4 flex items-center text-blue-700">
            <Fingerprint className="w-5 h-5 mr-2" />
            Your Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="font-medium text-gray-700">Name:</span>
              <span className="text-gray-900 font-medium">{userData.name}</span>
            </div>
            <div className="flex justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="font-medium text-gray-700">Roll Number:</span>
              <span className="text-gray-900 font-medium">
                {userData.rollNo}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
          <h3 className="font-medium text-lg mb-4 flex items-center text-green-700">
            <CheckCircle className="w-5 h-5 mr-2" />
            Final Checklist
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="text-green-600 mt-0.5 mr-3">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Stable Internet Connection
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Ensure you have a stable internet connection for the entire
                  duration of the test.
                </p>
              </div>
            </li>
            <li className="flex items-start p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="text-green-600 mt-0.5 mr-3">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Device Charged & Ready
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Your device should be fully charged or connected to a power
                  source.
                </p>
              </div>
            </li>
            <li className="flex items-start p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="text-green-600 mt-0.5 mr-3">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Time Management</p>
                <p className="text-sm text-gray-600 mt-1">
                  You will have 3 hours (180 minutes) to complete the test. Plan
                  your time accordingly.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6 shadow-md">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">Important Notice</h4>
              <p className="text-amber-700 text-sm mt-2">
                Once you start the test, you will not be able to pause or
                restart it. The timer will continue even if you close your
                browser or lose connection. Switching tabs or minimizing the
                browser window may result in warnings. After three warnings,
                your test may be automatically submitted.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-md">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms-accept"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1.5 mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-colors"
            />
            <label htmlFor="terms-accept" className="text-sm text-gray-700">
              I confirm that I have read and understood the test instructions. I
              agree to abide by the rules and confirm that I am ready to begin
              the test. I understand that the test cannot be paused once
              started, and I will not use any unfair means during the test.
            </label>
          </div>

          {!acceptedTerms && (
            <p className="text-sm text-red-600 mt-3 pl-7 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              You must accept the terms to proceed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreTestConfirmation;
