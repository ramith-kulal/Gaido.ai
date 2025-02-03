"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaChild, FaCaretDown, FaArrowRight } from "react-icons/fa";

export default function FirstPage({ nextStep, formData, updateFormData }) {
  const [selectedGender, setSelectedGender] = useState(formData.selectedGender);
  const [selectedMembers, setSelectedMembers] = useState(formData.selectedMembers);

  useEffect(() => {
    updateFormData({ selectedGender, selectedMembers });
  }, [selectedGender, selectedMembers]);

  const toggleGender = (gender) => {
    const newGender = gender === selectedGender ? null : gender;
    setSelectedGender(newGender);
  };

  const toggleMember = (member) => {
    setSelectedMembers((prev) =>
      prev.includes(member) ? prev.filter((m) => m !== member) : [...prev, member]
    );
  };

  const members =
    selectedGender === "Male"
      ? ["Self", "Wife", "Mother", "Father", "Son", "Daughter"]
      : selectedGender === "Female"
      ? ["Self", "Husband", "Mother", "Father", "Son", "Daughter"]
      : ["Self", "Husband", "Mother", "Father", "Son", "Daughter"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 md:px-0">
      <div className="text-center w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-900">Find the best plan for your family</h2>
        <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => toggleGender("Male")}
            className={`w-full sm:w-40 px-5 py-3 text-lg font-semibold rounded-md shadow-md transition ${
              selectedGender === "Male" ? "bg-black text-white border-2 border-black" : "bg-white text-black hover:bg-gray-700"
            }`}
          >
            Male
          </button>
          <button
            onClick={() => toggleGender("Female")}
            className={`w-full sm:w-40 px-5 py-3 text-lg font-semibold rounded-md shadow-md transition ${
              selectedGender === "Female" ? "bg-black text-white border-2 border-black" : "bg-white text-black hover:bg-gray-300"
            }`}
          >
            Female
          </button>
        </div>

        <p className="mt-8 text-lg font-medium text-gray-700">Select members you want to insure</p>
        <ul className="grid grid-cols-2 gap-6 mt-6 px-8 sm:grid-cols-3 md:grid-cols-3">
          {members.map((member) => (
            <li key={member} className="w-full">
              <input
                type="checkbox"
                id={`${member.toLowerCase()}-option`}
                className="hidden peer"
                checked={selectedMembers.includes(member)}
                onChange={() => toggleMember(member)}
              />
              <label
                htmlFor={`${member.toLowerCase()}-option`}
                className="flex items-center gap-3 w-full p-5 text-gray-700 bg-white border-2 border-gray-300 rounded-lg cursor-pointer peer-checked:border-black peer-checked:text-gray-900 hover:bg-gray-100 text-lg font-semibold"
              >
                {member === "Son" || member === "Daughter" ? (
                  <FaChild className="text-gray-500 peer-checked:text-black" />
                ) : (
                  <FaUser className="text-gray-500 peer-checked:text-black" />
                )}
                {member}
              </label>
            </li>
          ))}
          <li className="col-span-full text-center">
            <div className="flex items-center gap-3 justify-center w-full text-gray-700 cursor-pointer hover:bg-gray-100 text-lg font-semibold">
              <span>More Members</span>
              <FaCaretDown className="text-gray-500" />
            </div>
          </li>
        </ul>

        <button
          onClick={nextStep}
          className={`mt-8 w-full py-3 px-5 text-lg font-semibold rounded-md shadow-md transition ${
            selectedGender && selectedMembers.length > 0 ? "bg-black text-white hover:bg-gray-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedGender || selectedMembers.length === 0}
        >
          Continue <FaArrowRight className="inline-block ml-2" />
                   
        </button>

        <p className="mt-4 text-sm text-gray-600">
          By clicking Continue, you agree to our terms and conditions.
        </p>
      </div>
    </div>
  );
}
