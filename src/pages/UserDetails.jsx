import { useState, useMemo } from "react";
import Header from "../Components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UserDetails() {
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: null,
  });

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

  return (
    <div className="bg-gradient-to-b from-white to-[#0EC5EA] min-h-screen">
      <div className="mb-6">
        <Header />
      </div>

      <div className="w-full flex flex-col items-center justify-start pb-16">
        {/* Title */}
        <h2 className="text-[26px] font-lato font-bold text-[#0EC5EA] mb-6 tracking-tighter">
          User Details:
        </h2>

        {/* Form */}
        <div className="w-full max-w-xs flex flex-col gap-5">
          {/* Name Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Chris John"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-sky-200 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Email Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="chrisjohn192@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-sky-200 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Gender Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
              Gender
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setGender("male");
                  console.log("gender: male");
                }}
                className={`flex-1 flex items-center justify-center gap-2 border rounded-xl px-4 py-4 ${
                  gender === "male"
                    ?"bg-green-200 border-green-400"
                    : "bg-white border-sky-200"
                }`}
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/921/921079.png"
                  alt="Male"
                  className="w-6 h-6"
                />
                Male
              </button>
              <button
                type="button"
                onClick={() => {
                  setGender("female");
                  console.log("gender: female");
                }}
                className={`flex-1 flex items-center justify-center gap-2 border rounded-xl px-4 py-4 ${
                  gender === "female"
                    ? "bg-green-200 border-green-400"
                    : "bg-white border-sky-200"
                }`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/921/921071.png"
                  alt="Female"
                  className="w-6 h-6"
                />
                Female
              </button>
            </div>
          </div>

          {/* Profession Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
              Profession
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setProfession("student");
                  console.log("profession: student");
                }}
                className={`flex flex-col items-center justify-center gap-1 border rounded-xl px-4 py-4 ${
                  profession === "student"
                    ? "bg-green-200 border-green-400"
                    : "bg-white border-sky-200"
                }`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3616/3616930.png"
                  alt="Student"
                  className="w-8 h-8"
                />
                <span className="text-sm">Student</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfession("professional");
                  console.log("profession: professional");
                }}
                className={`flex flex-col items-center justify-center gap-1 border rounded-xl px-4 py-4 ${
                  profession === "professional"
                    ? "bg-green-200 border-green-400"
                    : "bg-white border-sky-200"
                }`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3616/3616523.png"
                  alt="Professional"
                  className="w-8 h-8"
                />
                <span className="text-sm">Professional</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfession("retired");
                  console.log("profession: retired");
                }}
                className={`flex flex-col items-center justify-center gap-1 border rounded-xl px-4 py-4 ${
                  profession === "retired"
                    ? "bg-green-200 border-green-400"
                    : "bg-white border-sky-200"
                }`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3616/3616653.png"
                  alt="Retired"
                  className="w-8 h-8"
                />
                <span className="text-sm">Retired</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfession("homemaker");
                  console.log("profession: homemaker");
                }}
                className={`flex flex-col items-center justify-center gap-1 border rounded-xl px-4 py-4 ${
                  profession === "homemaker"
                    ? "bg-green-200 border-green-400"
                    : "bg-white border-sky-200"
                }`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3616/3616936.png"
                  alt="Homemaker"
                  className="w-8 h-8"
                />
                <span className="text-sm">Homemaker</span>
              </button>
            </div>
          </div>

          {/* DOB and Age Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
              Date of Birth & Age
            </label>
            <div className="flex gap-3 w-full">
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
                  className="w-full border border-sky-200 rounded-xl px-4 py-3 shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-sky-400 
                           text-gray-700 bg-white placeholder-gray-400 text-base"
                  calendarClassName="rounded-xl border border-sky-200 shadow-lg bg-white p-4"
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
                  className="w-full border border-sky-200 rounded-xl px-4 py-3 shadow-sm 
                           text-gray-700 bg-gray-100 text-base text-center"
                />
              </div>
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