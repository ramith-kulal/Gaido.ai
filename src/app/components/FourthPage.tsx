"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaRegLightbulb, FaArrowRight } from "react-icons/fa";

// Define the types for formData and prop types
interface FormData {
  selectedConditions: string[];
  whatsappUpdates: boolean;
}

interface MedicalHistoryPageProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
}

const MedicalHistoryPage: React.FC<MedicalHistoryPageProps> = ({ nextStep, formData, prevStep }) => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>(formData.selectedConditions || []);
  const [whatsappUpdates, setWhatsappUpdates] = useState<boolean>(formData.whatsappUpdates || false);

  const conditions = [
    "Diabetes",
    "Blood Pressure",
    "Heart Disease",
    "Any Surgery",
    "Thyroid",
    "Asthma",
    "Other Disease",
    "None of These",
  ];

  // Function to toggle condition selection
  const toggleCondition = (condition: string) => {
    if (condition === "None of These") {
      setSelectedConditions(["None of These"]);
    } else {
      setSelectedConditions((prev) => {
        if (prev.includes(condition)) {
          return prev.filter((c) => c !== condition);
        } else {
          return prev.filter((c) => c !== "None of These").concat(condition);
        }
      });
    }
  };

  // Update formData when the state changes
  useEffect(() => {
    formData.selectedConditions = selectedConditions;
    formData.whatsappUpdates = whatsappUpdates;
  }, [selectedConditions, whatsappUpdates, formData]);

  return (
    <div className="relative min-h-screen bg-white px-4 md:px-0">
      {/* Back Icon */}
      <div onClick={prevStep} className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
        <button className="text-gray-700 text-xl sm:text-2xl p-2 hover:bg-gray-200 rounded-full">
          <FaArrowLeft />
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Medical History</h2>

          <p className="text-lg font-medium text-gray-700 text-center mb-8">
            Do any member(s) have any existing illness for which they take regular medication?
          </p>

          {/* Checkboxes for Conditions (2 per row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {conditions.map((condition) => (
              <label
                key={condition}
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-md cursor-pointer transition hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedConditions.includes(condition)}
                  onChange={() => toggleCondition(condition)}
                  className="w-5 h-5 text-gray-300 accent-black cursor-pointer"
                />
                <span className="text-md text-gray-700 font-medium">{condition}</span>
              </label>
            ))}
          </div>

          {/* Golden Info Box */}
          <div className="mt-8 p-4 bg-yellow-100 border opacity-70 border-yellow-200 rounded-md flex items-center text-yellow-900">
            <FaRegLightbulb className="text-xl mr-2 text-yellow-400" />
            <p className="text-sm font-medium">We will find plans that will cover your condition</p>
          </div>

          {/* WhatsApp Updates Checkbox */}
          <label className="mt-6 flex items-center gap-2 cursor-pointer text-gray-700 text-sm">
            <input
              type="checkbox"
              checked={whatsappUpdates}
              onChange={() => setWhatsappUpdates(!whatsappUpdates)}
              className="w-4 h-4 accent-black cursor-pointer"
            />
            Get updates on WhatsApp
          </label>

          {/* Continue Button with Right Arrow */}
          <button className="mt-6 w-full py-3 px-5 bg-black text-white text-lg font-semibold rounded-md shadow-md hover:bg-gray-700 flex justify-center items-center gap-2" onClick={nextStep}>
            Continue
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryPage;
