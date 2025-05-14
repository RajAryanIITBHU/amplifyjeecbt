"use client"
import React, { useState, useEffect } from "react";
import { UserRound, LockKeyhole, AlertTriangle } from "lucide-react";

const AuthScreen = ({ onAuthenticate, userData }) => {
  const [formData, setFormData] = useState({
    rollNo: userData.rollNo || "",
    password: "",
  });

  const [errors, setErrors] = useState({
    rollNo: "",
    password: "",
  });

  useEffect(() => {
    if (userData.rollNo) {
      setFormData((prev) => ({ ...prev, rollNo: userData.rollNo }));
    }
  }, [userData.rollNo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      const digits = value.replace(/\D/g, "");
      let formatted = "";

      if (digits.length <= 2) {
        formatted = digits;
      } else if (digits.length <= 4) {
        formatted = `${digits.slice(0, 2)}-${digits.slice(2)}`;
      } else {
        formatted = `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(
          4,
          8
        )}`;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear errors when user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  console.log(formData)

  const validateForm = () => {
    let isValid = true;
    const newErrors = { rollNo: "", password: "" };

    console.log(formData)

    // Validate roll number
    if (!formData.rollNo.toString().trim()) {
      newErrors.rollNo = "Roll number is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.rollNo)) {
      newErrors.rollNo = "Roll number should contain only digits";
      isValid = false;
    } else if(`${formData.rollNo}` !== `${userData.rollNo}`){
        newErrors.rollNo = "Incorrect Roll number";
        isValid = false;
    }

    // Validate password/DOB
    const d = userData.dob.split("-")
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.password)) {
      newErrors.password = "Please enter a valid date in DD-MM-YYYY format";
      isValid = false;
    } else if(formData.password !== `${d[2]}-${d[1]}-${d[0]}`){
        newErrors.password = "Incorrect Date of Birth";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onAuthenticate(formData);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center flex-col">
      {/* Header */}
      <div className="w-full px-4 py-3 bg-gradient-to-r from-blue-800 to-blue-700 text-white shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex flex-col space-y-1 pl-2">
            <div className="text-sm font-medium text-blue-50">System Name:</div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight">
              C001
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-end pr-4">
              <div className="text-sm font-medium text-blue-50">
                Candidate Name:
              </div>
              <div className="text-xl md:text-2xl font-semibold mt-1 tracking-tight">
                {userData.name || "Not Authenticated"}
              </div>
            </div>
            <div className="relative w-20 md:w-24 aspect-square rounded-full bg-white/90 border-2 border-white flex items-center justify-center shadow-lg">
              <UserRound size={36} className="text-blue-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 w-full max-w-md px-6 py-12 flex flex-col items-center justify-center">
        <div
          className="bg-white w-full rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl"
          style={{ animation: "fadeIn 0.5s ease-out" }}
        >
          <div className="w-full px-6 py-4 bg-blue-600 text-white">
            <h2 className="text-xl font-semibold tracking-tight">
              Candidate Login
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Roll Number Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Roll Number
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <div className="px-4 py-3 bg-gray-50 text-gray-500 border-r">
                  <UserRound size={20} />
                </div>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 focus:outline-none text-gray-800"
                  placeholder="Enter your roll number"
                  autoComplete="off"
                />
              </div>
              {errors.rollNo && (
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <AlertTriangle size={14} className="mr-1" />
                  {errors.rollNo}
                </p>
              )}
            </div>

            {/* Password/DOB Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password (Date of Birth)
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <div className="px-4 py-3 bg-gray-50 text-gray-500 border-r">
                  <LockKeyhole size={20} />
                </div>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 focus:outline-none text-gray-800"
                  placeholder="DD-MM-YYYY"
                  maxLength={10}
                  autoComplete="off"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <AlertTriangle size={14} className="mr-1" />
                  {errors.password}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1 pl-1">
                Date of birth in DD-MM-YYYY format (e.g., 01-05-2000)
              </p>
            </div>

            <button
              onClick={handleContinue}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-gray-800 text-white py-3">
        <div className="max-w-screen-xl mx-auto text-center font-mono text-sm">
          Version 2.0, &copy; AmplifyJEE.in
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
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

export default AuthScreen;
