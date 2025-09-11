import React, { useState } from "react";

const moodOptions = [
  {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
    border: "border-green-500",
    ping: "bg-green-400",
  },
  {
    id: "anxious",
    label: "Anxious",
    emoji: "😰",
    gradient: "bg-gradient-to-br from-amber-400 to-orange-600",
    border: "border-amber-500",
    ping: "bg-amber-400",
  },
  {
    id: "calm",
    label: "Calm",
    emoji: "😌",
    gradient: "bg-gradient-to-br from-violet-400 to-purple-600",
    border: "border-violet-500",
    ping: "bg-violet-400",
  },
  {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    gradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
    border: "border-blue-500",
    ping: "bg-blue-400",
  },
  {
    id: "angry",
    label: "Angry",
    emoji: "😠",
    gradient: "bg-gradient-to-br from-red-400 to-rose-600",
    border: "border-red-500",
    ping: "bg-red-400",
  },
];

const MoodCheckin = ({ onSubmit }) => {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleSelect = (moodId) => {
    setSelected(moodId);
  };

  const handleNext = () => {
    if (selected && onSubmit) {
      onSubmit(selected); // ✅ send to Profile.jsx
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between z-50 p-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 animate-float"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              top: `${15 + i * 15}%`,
              left: `${i * 15}%`,
              backgroundColor: `hsl(${i * 60}, 70%, 60%)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + i * 2}s`,
            }}
          />
        ))}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i + 5}
            className="absolute rounded-full opacity-10 animate-float-reverse"
            style={{
              width: `${30 + i * 15}px`,
              height: `${30 + i * 15}px`,
              top: `${10 + i * 10}%`,
              right: `${i * 12}%`,
              backgroundColor: `hsl(${i * 40}, 70%, 60%)`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${12 + i * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md text-center mt-8 relative z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-pulse">
          Hey Daniel,
        </h2>
        <p className="text-gray-600 mb-8 text-lg">How are you feeling today?</p>

        {/* Mood Grid */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleSelect(mood.id)}
              onMouseEnter={() => setHovered(mood.id)}
              onMouseLeave={() => setHovered(null)}
              className={`py-6 w-full flex flex-col items-center justify-center rounded-2xl border-2 cursor-pointer transition-all duration-300 
                ${mood.gradient} ${mood.border}
                ${
                  selected === mood.id
                    ? "ring-4 ring-white ring-opacity-90 scale-105 shadow-xl animate-bounce-short"
                    : "hover:scale-110 hover:shadow-lg"
                }
                ${hovered && hovered !== mood.id ? "opacity-80" : "opacity-100"}
                transform-gpu`}
            >
              <span 
                className={`text-4xl mb-3 transition-transform duration-300 ${
                  selected === mood.id || hovered === mood.id 
                    ? "scale-125 animate-wiggle" 
                    : "scale-100"
                }`}
              >
                {mood.emoji}
              </span>
              <span className="text-sm font-semibold text-white bg-black bg-opacity-30 px-3 py-1 rounded-full">
                {mood.label}
              </span>
              
              {/* Selection indicator */}
              {selected === mood.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full animate-ping ${mood.ping}`}></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Next button */}
      <div className="w-full max-w-md mb-8 relative z-10">
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg 
                   transition-all duration-300 transform-gpu
                   ${
                     selected
                       ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 scale-100 hover:scale-105 shadow-xl"
                       : "bg-gray-400 scale-95"
                   }
                   shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {selected ? "Continue with your day! ✨" : "Select how you feel"}
        </button>
        
        {/* Floating particles when selected */}
        {selected && (
          <div className="absolute -top-4 left-0 right-0 flex justify-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full mx-1 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-5deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        @keyframes bounce-short {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 18s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
        .animate-bounce-short {
          animation: bounce-short 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default MoodCheckin;
