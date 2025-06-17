import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PhoneNumberPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savingsGoal, setSavingsGoal] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const validatePhoneNumber = (number) => /^[6-9]\d{9}$/.test(number);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError("");
    } else {
      triggerShake("Phone number cannot exceed 10 digits");
    }
  };

  const triggerShake = (msg) => {
    setError(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 650);
  };

  const handleSaveUserDetails = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      triggerShake("Please enter a valid 10-digit Indian phone number");
      return;
    }
    const goal = Number(savingsGoal);
    if (!goal || isNaN(goal) || goal <= 0) {
      setError("Please enter a valid savings goal amount");
      return;
    }

    // Simulate success
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f9fbfd] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 space-y-6 animate-fadeIn">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-indigo-600">Fintrack</h1>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Complete Your Profile</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your details to complete the setup:</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-500 rounded p-2 text-sm border border-red-300">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
            <div className="flex">
              <div className="px-3 flex items-center bg-gray-100 border border-r-0 border-gray-200 rounded-l-md text-gray-600 text-sm">
                +91
              </div>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter 10-digit number"
                className={`w-full h-11 rounded-r-md px-3 border ${
                  isShaking
                    ? "border-red-400 animate-shake"
                    : "border-gray-200 focus:border-indigo-500 focus:outline-none"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Savings Goal (₹)*</label>
            <input
              type="number"
              required
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
              min="0"
              placeholder="Enter your monthly savings goal"
              className="w-full h-11 px-3 border border-gray-200 rounded-md focus:border-indigo-500 focus:outline-none no-spinner"
            />
          </div>

          <button
            onClick={handleSaveUserDetails}
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
          >
            Complete Setup
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(6px); }
          75% { transform: translateX(-6px); }
        }
        .animate-shake {
          animation: shake 0.65s cubic-bezier(.36, .07, .19, .97) 1;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default PhoneNumberPage;
