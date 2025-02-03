"use client";
import React, { useState } from "react";
import FirstPage from "./components/Firstpage";
import SecondPage from "./components/SecondPage";
import ThirdPage from "./components/ThirdPage";
import FourthPage from "./components/FourthPage";
import ConfirmationPage from "./components/Confirmationpage";

export default function Home() {
  // Step tracker (starting from 1)
  const [currentStep, setCurrentStep] = useState(1);

  // Global form data (stores gender, members, and other data)
  const [formData, setFormData] = useState({
    selectedGender: null,
    selectedMembers: [],
    yourAge: "",
    wifeAge: "",
    sonAge: "",
    daughterAge: "",
  });

  // Function to update form data (for each field or batch updates)
  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Functions to navigate between steps
  const nextStep = () => {
    setCurrentStep((prev) => {
      const nextStep = prev + 1;
      console.log("Current Step:", nextStep); // Debugging log to track step
      return nextStep;
    });
  };
  
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Render the current step conditionally
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FirstPage
            nextStep={nextStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <SecondPage
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ThirdPage
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <FourthPage
            formData={formData}
            prevStep={prevStep}
            updateFormData={updateFormData}
            nextStep={nextStep} // Pass nextStep here for the final step
          />
        );
      case 5:
        return (
          <ConfirmationPage
            formData={formData}
            prevStep={prevStep}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
