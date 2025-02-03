"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaChild, FaArrowLeft, FaChevronDown, FaArrowRight } from "react-icons/fa";

export default function SecondPage({ nextStep, formData, prevStep, updateFormData }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentField, setCurrentField] = useState('');

  // Initialize ages from formData or set default empty values
  const [ages, setAges] = useState(() => ({
    "Self": formData.yourAge || '',
    "Wife": formData.wifeAge || '',
    "Husband": formData.husbandAge || '',
    "Mother": formData.motherAge || '',
    "Father": formData.fatherAge || '',
    "Son": formData.sonAge || '',
    "Daughter": formData.daughterAge || ''
  }));

  // Sync local state with formData when component mounts
  useEffect(() => {
    setAges({
      "Self": formData.yourAge || '',
      "Wife": formData.wifeAge || '',
      "Husband": formData.husbandAge || '',
      "Mother": formData.motherAge || '',
      "Father": formData.fatherAge || '',
      "Son": formData.sonAge || '',
      "Daughter": formData.daughterAge || ''
    });
  }, [formData]);

  const toggleDropdown = (field) => {
    setCurrentField(field);
    setIsDropdownOpen(prevState => prevState !== field ? field : '');
  };

  const handleAgeSelect = (age) => {
    setAges(prev => ({ ...prev, [currentField]: age.toString() }));
    setIsDropdownOpen('');
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only numeric values
    if (value === "" || (parseInt(value) > 0 && parseInt(value) <= 100)) {
      setAges(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleContinue = () => {
    updateFormData({
      yourAge: ages["Self"],
      wifeAge: ages["Wife"],
      husbandAge: ages["Husband"],
      motherAge: ages["Mother"],
      fatherAge: ages["Father"],
      sonAge: ages["Son"],
      daughterAge: ages["Daughter"],
    });
    nextStep();
  };

  const renderAgeInput = (member, icon, color) => {
    if (!formData.selectedMembers.includes(member)) return null;

    return (
      <div className="flex items-center justify-start gap-6">
        <div className={`flex items-center justify-center w-10 h-10 ${color} rounded-full mt-4`}>
          {icon}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor={`${member.toLowerCase()}-age`} className="text-lg font-semibold text-gray-700">
            {member}'s Age
          </label>
          <div className="relative">
            <input
              id={`${member.toLowerCase()}-age`}
              type="text"
              className="w-full px-6 py-3 mt-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
              value={ages[member]}
              onChange={(e) => handleInputChange(e, member)}
            />
            <button
              onClick={() => toggleDropdown(member)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
            >
              <FaChevronDown />
            </button>

            {isDropdownOpen === member && (
              <div className="absolute right-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md z-50 max-h-40 overflow-y-auto">
                {[...Array(100).keys()].map(i => (
                  <div
                    key={i}
                    onClick={() => handleAgeSelect(i + 1)}
                    className="px-6 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Check if all selected members have entered an age
  const isFormComplete = formData.selectedMembers.every(member => ages[member] !== "");

  return (
    <div className="relative min-h-screen bg-white px-4 md:px-0">
      <div onClick={prevStep} className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
        <button className="text-gray-700 text-xl sm:text-2xl p-2 hover:bg-gray-200 rounded-full">
          <FaArrowLeft />
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Select or enter the age of covered member(s)
          </h2>

          <div className="space-y-6">
            {renderAgeInput("Self", <FaUser className="text-blue-500 text-xl" />, "bg-blue-100")}
            {renderAgeInput("Wife", <FaUser className="text-purple-500 text-xl" />, "bg-purple-100")}
            {renderAgeInput("Husband", <FaUser className="text-purple-500 text-xl" />, "bg-purple-100")}
            {renderAgeInput("Mother", <FaUser className="text-green-500 text-xl" />, "bg-green-100")}
            {renderAgeInput("Father", <FaUser className="text-green-500 text-xl" />, "bg-green-100")}
            {renderAgeInput("Son", <FaChild className="text-pink-500 text-xl" />, "bg-pink-100")}
            {renderAgeInput("Daughter", <FaChild className="text-pink-500 text-xl" />, "bg-pink-100")}
          </div>

          <button 
            onClick={handleContinue} 
            disabled={!isFormComplete} 
            className={`mt-8 w-full py-3 px-5 text-lg font-semibold rounded-md shadow-md
              ${isFormComplete ? "bg-black text-white hover:bg-gray-700" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
          >
            Continue <FaArrowRight className="inline-block ml-2" />
                      
          </button>
        </div>
      </div>
    </div>
  );
}
