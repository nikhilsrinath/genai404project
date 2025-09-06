import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UserDetails() {
  const [gender, setGender] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: null,
  });
  const navigate = useNavigate();

  // Calculate age based on selected date
  const age = useMemo(() => {
    if (!formData.dob) return "";
    
    const today = new Date();
    const birthDate = new Date(formData.dob);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    return calculatedAge;
  }, [formData.dob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Validate required fields
    if (!formData.name || !formData.email || !gender || !formData.dob) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    // Save data to session storage
    const userDetails = {
      name: formData.name,
      email: formData.email,
      gender: gender,
      dob: formData.dob,
      age: age
    };
    
    sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
    
    // Navigate to profession page
    navigate('/profession');
  };

  return (
    <div className="bg-gradient-to-b from-white to-[#0EC5EA] min-h-screen">
      <div className="mb-6">
        <Header />
      </div>

      <div className="w-full flex flex-col items-center justify-start pb-16 px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#0EC5EA] mb-8 text-center">
          User Details
        </h2>

        {/* Form Container */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          {/* Form */}
          <div className="flex flex-col gap-6">
            {/* Name Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Chris John"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EC5EA] focus:border-transparent"
              />
            </div>

            {/* Email Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="chrisjohn192@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EC5EA] focus:border-transparent"
              />
            </div>

            {/* Gender Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gender
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setGender("male");
                    console.log("gender: male");
                  }}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 border-2 rounded-xl p-4 transition-all ${
                    gender === "male"
                      ? "bg-[#0EC5EA] border-[#0EC5EA] text-white shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:border-[#0EC5EA]"
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/921/921079.png"
                    alt="Male"
                    className="w-8 h-8"
                  />
                  <span className="text-sm font-medium">Male</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGender("female");
                    console.log("gender: female");
                  }}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 border-2 rounded-xl p-4 transition-all ${
                    gender === "female"
                      ? "bg-[#0EC5EA] border-[#0EC5EA] text-white shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:border-[#0EC5EA]"
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/921/921071.png"
                    alt="Female"
                    className="w-8 h-8"
                  />
                  <span className="text-sm font-medium">Female</span>
                </button>
              </div>
            </div>

            {/* DOB and Age Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth & Age
              </label>
              <div className="flex gap-4 w-full">
                {/* DOB - 70% width */}
                <div className="w-[70%]">
                  <DatePicker
                    selected={formData.dob}
                    onChange={(date) => {
                      console.log("dob:", date);
                      setFormData((prev) => ({ ...prev, dob: date }));
                    }}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    placeholderText="Select Date of Birth"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm 
                             focus:outline-none focus:ring-2 focus:ring-[#0EC5EA] focus:border-transparent 
                             text-gray-700 bg-white placeholder-gray-400"
                    calendarClassName="rounded-xl border border-gray-200 shadow-lg bg-white p-4"
                    dayClassName={(date) =>
                      date.getDate() === formData.dob?.getDate() &&
                      date.getMonth() === formData.dob?.getMonth() &&
                      date.getYear() === formData.dob?.getYear()
                        ? "bg-[#0EC5EA] text-white rounded-md"
                        : "rounded-md hover:bg-[#0EC5EA]/20 transition-colors cursor-pointer"
                    }
                  />
                </div>
                
                {/* Age - 30% width */}
                <div className="w-[30%]">
                  <input
                    type="text"
                    placeholder="Age"
                    value={age ? `${age} years` : ""}
                    readOnly
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm 
                             text-gray-700 bg-gray-100 text-center font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-4">
              <button
                onClick={handleNext}
                className="w-full bg-[#0EC5EA] hover:bg-[#0da9c9] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-xs text-gray-600">
          All rights reserved © GenAI 404
        </footer>
      </div>
    </div>
  );
}