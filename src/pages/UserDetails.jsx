import { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gradient-to-b from-white to-[#0EC5EA]">
      <div className="mb-6">
        <Header />
      </div>

      <div className="h-screen w-full flex flex-col items-center justify-start">
        {/* Title */}
        <h2 className="text-[26px] font-lato font-bold text-[#0EC5EA] mb-6 tracking-tighter">
          User Details:
        </h2>

        {/* Form */}
        <div className="w-full max-w-xs flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Chris John"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-sky-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="chrisjohn192@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-sky-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          {/* Gender */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setGender("male");
                console.log("gender: male");
              }}
              className={`flex-1 flex items-center justify-center gap-2 border rounded-xl px-4 py-6 ${
                gender === "male"
                  ? "bg-green-200 border-green-400"
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
              className={`flex-1 flex items-center justify-center gap-2 border rounded-xl px-4 py-6 ${
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

          {/* DOB - Updated DatePicker */}
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
            wrapperClassName="w-full"
            dayClassName={(date) =>
              date.getDate() === formData.dob?.getDate() &&
              date.getMonth() === formData.dob?.getMonth() &&
              date.getYear() === formData.dob?.getYear()
                ? "bg-[#0EC5EA] text-white rounded-md"
                : "rounded-md hover:bg-[#0EC5EA]/20 transition-colors cursor-pointer"
            }
          />
        </div>

        {/* Footer */}
        <footer className="absolute bottom-4 text-xs text-gray-600">
          All rights reserved © GenAI 404
        </footer>
      </div>
    </div>
  );
}