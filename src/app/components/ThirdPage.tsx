"use client"
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { FaHospital } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io"; // Import close icon
import { FaArrowRight } from "react-icons/fa"; // Import right arrow icon

// Type for props in the CityButton component
interface CityButtonProps {
  city: string;
  selectedCity: string;
  toggleCity: (city: string) => void;
}

// Reusable CityButton component
const CityButton: React.FC<CityButtonProps> = ({ city, selectedCity, toggleCity }) => {
  return (
    <button
      onClick={() => toggleCity(city)}
      className={`w-20 sm:w-32 px-3 py-2 sm:px-5 sm:py-3 text-sm sm:text-lg font-semibold rounded-md shadow-md transition ${
        selectedCity === city
          ? "bg-black text-white border-2 border-black"
          : "bg-white text-black hover:bg-gray-300"
      }`}
    >
      {city}
    </button>
  )
}

interface ThirdPageProps {
  nextStep: () => void;
  formData: any; // Replace with appropriate type for formData
  prevStep: () => void;
  updateFormData: (data: any) => void; // Replace with appropriate type for formData update function
}

const ThirdPage: React.FC<ThirdPageProps> = ({ nextStep, formData, prevStep, updateFormData }) => {
  const [selectedCity, setSelectedCity] = useState<string>(formData.selectedCity || '')

  // Function to handle city selection
  const toggleCity = (city: string) => {
    setSelectedCity(city)
    updateFormData({ ...formData, selectedCity: city }) // Update formData in parent
  }

  // Function to clear input
  const clearCity = () => {
    setSelectedCity('')
    updateFormData({ ...formData, selectedCity: '' }) // Update formData in parent
  }

  const cities: string[] = ["Bangalore", "Chennai", "Mumbai", "Delhi", "Hyderabad", "Goa", "Kolkata", "Kochi"]

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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Select Your City
          </h2>

          <div className="space-y-6">
            {/* Your City */}
            <div className="flex flex-col w-full">
              <label htmlFor="city" className="text-lg font-semibold text-gray-700">
                Your City
              </label>
              <div className="relative">
                <input
                  id="city"
                  type="text"
                  className="w-full px-6 py-3 mt-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type or select a city"
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value)
                    updateFormData({ ...formData, selectedCity: e.target.value }) // Update formData in parent
                  }}
                />
                {/* Clear Button */}
                {selectedCity && (
                  <button 
                    onClick={clearCity} 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                  >
                    <IoMdClose size={22} />
                  </button>
                )}
              </div>
            </div>

            <p className="mt-8 text-base font-medium text-gray-700">
              Popular cities
            </p>

            {/* City Selection Buttons */}
            <div className="mt-8 flex flex-wrap gap-2 sm:gap-4 justify-center items-center">
              {cities.map((city) => (
                <CityButton
                  key={city}
                  city={city}
                  selectedCity={selectedCity}
                  toggleCity={toggleCity}
                />
              ))}
            </div>
          </div>

          {/* Hospital Icon and Text */}
          <div className="mt-20 flex items-center gap-2">
            <FaHospital className="text-4xl text-black" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                This will help us find the network of
              </p>
              <p className="text-base text-gray-900 font-bold">
                Cashless Hospitals
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <button 
            onClick={nextStep} 
            className={`mt-8 w-full py-3 px-5 text-lg font-semibold rounded-md shadow-md 
              ${selectedCity ? "bg-black text-white hover:bg-gray-700" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
            disabled={!selectedCity}
          >
            Continue <FaArrowRight className="inline-block ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThirdPage;
