"use client";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

interface FormData {
  selectedCity: string;
  selectedConditions: string[];
  whatsappUpdates: boolean;
  selectedMembers: { name: string; age: string }[]; // Adding the selected members with their names and ages
}

interface ConfirmationPageProps {
  formData: FormData;
  prevStep: () => void;
}

export default function ConfirmationPage({ formData, prevStep }: ConfirmationPageProps) {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitForm = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-white">
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Submission Successful!</h2>
          <p className="text-lg text-gray-700 mb-4">Your details have been successfully submitted.</p>
        </div>
      </div>
    );
  }

  // Debugging with console.log
  console.log("Form Data: ", formData);

  return (
    <div className="relative min-h-screen bg-white px-4 md:px-0">
      <div onClick={prevStep} className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
        <button className="text-gray-700 text-xl sm:text-2xl p-2 hover:bg-gray-200 rounded-full">
          <FaArrowLeft />
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Confirm Your Details</h2>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">Selected City:</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{formData.selectedCity || "Not Selected"}</p>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">Medical History:</p>
              <div className="mt-1 space-y-1">
                {formData.selectedConditions.length > 0 ? (
                  formData.selectedConditions.map((condition, index) => (
                    <p key={index} className="text-md text-gray-800 font-medium">
                      • {condition}
                    </p>
                  ))
                ) : (
                  <p className="text-md text-gray-800 font-medium">No conditions selected</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">Selected Members:</p>
              <div className="mt-1 space-y-1">
                {formData.selectedMembers.length > 0 ? (
                  formData.selectedMembers.map((member, index) => (
                    <p key={index} className="text-md text-gray-800 font-medium">
                      {member}
                    </p>
                  ))
                ) : (
                  <p className="text-md text-gray-800 font-medium">No members selected</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm">
                <input type="checkbox" checked={formData.whatsappUpdates} readOnly className="w-4 h-4 accent-black cursor-pointer" />
                Get updates on WhatsApp
              </label>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button onClick={() => setShowModal(true)} className="w-full sm:w-auto flex-1 py-3 px-5 bg-black text-white text-lg font-semibold rounded-md shadow-md hover:bg-gray-700">
              Confirm & Submit
            </button>

            <button onClick={prevStep} className="w-full sm:w-auto flex-1 py-3 px-5 bg-gray-300 text-gray-900 text-lg font-semibold rounded-md shadow-md hover:bg-gray-400">
              Edit Details
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Confirm Submission</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-gray-900">
                <IoMdClose size={22} />
              </button>
            </div>

            <p className="mt-4 text-gray-700">Are you sure you want to submit your details?</p>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setShowModal(false)} className="py-2 px-4 bg-gray-300 text-gray-900 font-semibold rounded-md hover:bg-gray-400">
                Cancel
              </button>

              <button onClick={submitForm} className="py-2 px-4 bg-black text-white font-semibold rounded-md shadow-md hover:bg-gray-700 flex items-center gap-2">
                <IoCheckmarkCircleOutline size={20} />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
