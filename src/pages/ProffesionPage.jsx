import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function ProfessionPage() {
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [industry, setIndustry] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    // Check if user details exist in session storage
    const userDetails = sessionStorage.getItem('userDetails');
    if (!userDetails) {
      // Redirect back to user details if no data found
      navigate('/userdetails');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    // Validate profession selection
    if (!profession) {
      alert("Please select your profession.");
      return;
    }

    try {
      // Get user details from session storage
      const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
      
      // Get current authenticated user
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user found");
      }
      
      // Create user identifier - prefer UID, fallback to email prefix
      let userIdentifier;
      if (user.uid) {
        userIdentifier = user.uid;
      } else if (userDetails.email) {
        userIdentifier = userDetails.email.split('@')[0];
      } else {
        throw new Error("No user identifier available");
      }
      
      // Add profession data
      const completeUserData = {
        ...userDetails,
        profession,
        experience,
        education,
        industry,
        timestamp: new Date().toISOString()
      };
      
      // Store in localStorage
      localStorage.setItem('userData', JSON.stringify(completeUserData));
      
      // Store in Firebase Realtime Database
      await set(ref(db, 'users/' + userIdentifier), completeUserData);
      
      console.log("User data saved to Firebase:", completeUserData);
      
      // Clear session storage
      sessionStorage.removeItem('userDetails');
      
      // Navigate to the home page
      navigate('/');
      
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("There was an error saving your data. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-[#0EC5EA] min-h-screen">
      <div className="mb-6">
        <Header />
      </div>

      <div className="w-full flex flex-col items-center justify-start pb-16 px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#0EC5EA] mb-8 text-center">
          Professional Information
        </h2>

        {/* Form Container */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          {/* Form */}
          <div className="flex flex-col gap-6">
            {/* Profession Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What is your current profession?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setProfession("student");
                    console.log("profession: student");
                  }}
                  className={`flex flex-col items-center justify-center gap-2 border-2 rounded-xl p-4 transition-all ${
                    profession === "student"
                      ? "bg-[#0EC5EA] border-[#0EC5EA] text-white shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:border-[#0EC5EA]"
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3616/3616930.png"
                    alt="Student"
                    className="w-8 h-8"
                  />
                  <span className="text-sm font-medium">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfession("professional");
                    console.log("profession: professional");
                  }}
                  className={`flex flex-col items-center justify-center gap-2 border-2 rounded-xl p-4 transition-all ${
                    profession === "professional"
                      ? "bg-[#0EC5EA] border-[#0EC5EA] text-white shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:border-[#0EC5EA]"
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3616/3616523.png"
                    alt="Professional"
                    className="w-8 h-8"
                  />
                  <span className="text-sm font-medium">Professional</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfession("retired");
                    console.log("profession: retired");
                  }}
                  className={`flex flex-col items-center justify-center gap-2 border-2 rounded-xl p-4 transition-all ${
                    profession === "retired"
                      ? "bg-[#0EC5EA] border-[#0EC5EA] text-white shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:border-[#0EC5EA]"
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3616/3616653.png"
                    alt="Retired"
                    className="w-8 h-8"
                  />
                  <span className="text-sm font-medium">Retired</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfession("homemaker");
                    console.log("profession: homemaker");
                  }}
                  className={`flex flex-col items-center justify-center gap-2 border-2 rounded-xl p-4 transition-all ${
                    profession === "homemaker"
                      ? "bg-[#0EC5EA] border-[#0EC5EA] text-white shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:border-[#0EC5EA]"
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3616/3616936.png"
                    alt="Homemaker"
                    className="w-8 h-8"
                  />
                  <span className="text-sm font-medium">Homemaker</span>
                </button>
              </div>
            </div>

            {/* Industry Section (For Professionals) */}
            {profession === "professional" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EC5EA] focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {/* Experience Section (For Professionals) */}
            {profession === "professional" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EC5EA] focus:border-transparent"
                >
                  <option value="">Select experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            )}

            {/* Education Section (For Students) */}
            {profession === "student" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EC5EA] focus:border-transparent"
                >
                  <option value="">Select education level</option>
                  <option value="highschool">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Postgraduate</option>
                </select>
              </div>
            )}

            {/* Field of Study (For Students) */}
            {profession === "student" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0EC5EA] focus:border-transparent"
                >
                  <option value="">Select field of study</option>
                  <option value="computer_science">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business</option>
                  <option value="medicine">Medicine</option>
                  <option value="arts">Arts & Humanities</option>
                  <option value="sciences">Natural Sciences</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-[#0EC5EA] hover:bg-[#0da9c9] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
              >
                Complete Registration
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