import React, { useState, useEffect } from "react";
import { ArrowLeft, Settings } from "lucide-react";
import MoodCheckin from "./MoodCheckin";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const moods = {
  happy: { 
    label: "😊", 
    bg: "bg-gradient-to-br from-green-400 to-emerald-600", 
    border: "border-green-500", 
    color: "text-green-500",
    value: 4
  },
  sad: { 
    label: "😢", 
    bg: "bg-gradient-to-br from-blue-400 to-indigo-600", 
    border: "border-blue-500", 
    color: "text-blue-500",
    value: 0
  },
  angry: { 
    label: "😠", 
    bg: "bg-gradient-to-br from-red-400 to-rose-600", 
    border: "border-red-500", 
    color: "text-red-500",
    value: 1
  },
  calm: { 
    label: "😌", 
    bg: "bg-gradient-to-br from-violet-400 to-purple-600", 
    border: "border-purple-500", 
    color: "text-purple-500",
    value: 3
  },
  anxious: { 
    label: "😟", 
    bg: "bg-gradient-to-br from-amber-400 to-orange-500", 
    border: "border-amber-500", 
    color: "text-amber-500",
    value: 2
  },
};

const stringToColor = (str) => {
  const colors = { green: '34d399', blue: '60a5fa', red: 'f87171', violet: 'a78bfa', amber: 'fbbf24', purple: 'a855f7', indigo: '818cf8', rose: 'fb7185', orange: 'fb923c', emerald: '10b981' };
  return colors[str] || '10b981';
};

const getMoodGradientStart = (mood) => {
  const match = mood.bg.match(/from-([a-z]+)-\d+/);
  return match ? `#${stringToColor(match[1])}` : '#10b981';
};

const getMoodGradientEnd = (mood) => {
  const match = mood.bg.match(/to-([a-z]+)-\d+/);
  return match ? `#${stringToColor(match[1])}` : '#059669';
};

const getMoodBorder = (mood) => {
  const match = mood.border.match(/border-([a-z]+)-\d+/);
  return match ? `#${stringToColor(match[1])}` : '#10b981';
};

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getPastDates = (days) => {
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(getDateKey(date));
  }
  return dates;
};

const MoodGraph = ({ moodHistory }) => {
  const past7Days = getPastDates(5);
  const data = past7Days.map(date => ({
    date,
    mood: moodHistory[date] || null,
    day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
  }));

  const maxValue = 4;
  const graphHeight = 180;
  const pointRadius = 15;
  const padding = 40;
  const viewBoxWidth = 100;
  const viewBoxPadding = 10;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Mood Trend (Last 5 Days)
      </h3>
      
      <div className="relative" style={{ height: graphHeight + padding * 2 }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pt-4 pb-4">
          <span>Happy</span>
          <span>Calm</span>
          <span>Anxious</span>
          <span>Angry</span>
          <span>Sad</span>
        </div>
        
        {/* Graph container */}
        <div className="ml-12 h-full">
          {/* Grid lines */}
          <div className="absolute w-full h-full flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((value) => (
              <div 
                key={value} 
                className="border-t border-gray-200"
                style={{ 
                  position: 'absolute', 
                  top: `${padding + (maxValue - value) * (graphHeight / maxValue)}px`, 
                  width: 'calc(100% - 48px)',
                  left: '0px'
                }}
              ></div>
            ))}
          </div>
          
          {/* Graph line and points */}
          <svg 
            width="100%" 
            height={graphHeight + padding * 2} 
            viewBox={`-${viewBoxPadding} 0 ${viewBoxWidth + viewBoxPadding * 2} ${graphHeight + padding * 2}`}
            preserveAspectRatio="xMidYMid meet"
            className="mt-2"
          >
            {/* Line connecting points (rendered first to be below points) */}
            <polyline
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              points={data
                .map((item, index) => {
                  if (!item.mood) return null;
                  const x = (index * (viewBoxWidth - pointRadius * 2) / (data.length - 1)) + pointRadius;
                  const y = padding + (graphHeight - (moods[item.mood]?.value * (graphHeight / maxValue)));
                  return `${x},${y}`;
                })
                .filter(point => point !== null)
                .join(' ')
              }
              style={{ zIndex: 0 }}
            />
            
            {/* Gradient definitions */}
            <defs>
              {data.map((item, index) => {
                if (!item.mood) return null;
                const gradientId = `gradient-${item.mood}-${index}`;
                return (
                  <linearGradient key={gradientId} id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={getMoodGradientStart(moods[item.mood])} />
                    <stop offset="100%" stopColor={getMoodGradientEnd(moods[item.mood])} />
                  </linearGradient>
                );
              })}
            </defs>
            
            {/* Points with emojis (rendered after polyline to be above) */}
            {data.map((item, index) => {
              if (!item.mood) return null;
              const x = (index * (viewBoxWidth - pointRadius * 2) / (data.length - 1)) + pointRadius;
              const y = padding + (graphHeight - (moods[item.mood]?.value * (graphHeight / maxValue)));
              
              return (
                <g key={index} style={{ zIndex: 1 }}>
                  <circle
                    cx={x}
                    cy={y}
                    r={pointRadius}
                    fill={`url(#gradient-${item.mood}-${index})`}
                    stroke={getMoodBorder(moods[item.mood])}
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fill="white"
                  >
                    {moods[item.mood]?.label}
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* X-axis labels (days) */}
          <div className="flex justify-between mt-4 text-xs text-gray-600">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <span>{item.day}</span>
                <span className="text-gray-400">{new Date(item.date).getDate()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 mt-20">
        {Object.entries(moods).map(([key, mood]) => (
          <div key={key} className="flex items-center space-x-2 p-1 rounded-lg bg-gray-50">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center ${mood.bg} text-white text-xs`}>
              {mood.label}
            </span>
            <span className="text-xs text-gray-700 capitalize">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState({});

  useEffect(() => {
    const savedMood = localStorage.getItem("currentMood");
    const lastCheckin = localStorage.getItem("lastCheckin");
    const history = JSON.parse(localStorage.getItem("moodHistory") || "{}");
    if (savedMood && lastCheckin) {
      const last = new Date(lastCheckin);
      const now = new Date();
      if (getDateKey(last) === getDateKey(now)) {
        setCurrentMood(savedMood);
        const dateKey = getDateKey(now);
        history[dateKey] = savedMood;
        localStorage.setItem("moodHistory", JSON.stringify(history));
      }
    }
    setMoodHistory(history);
  }, []);

  const mood = currentMood ? moods[currentMood] : null;

  useEffect(() => {
    if (mood) {
      document.documentElement.style.setProperty('--today-gradient-start', getMoodGradientStart(mood));
      document.documentElement.style.setProperty('--today-gradient-end', getMoodGradientEnd(mood));
      document.documentElement.style.setProperty('--today-border', getMoodBorder(mood));
    }
  }, [mood]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const moodId = moodHistory[getDateKey(date)];
      if (moodId) {
        const moodData = moods[moodId];
        return (
          <div className="flex items-center justify-center h-full pt-3">
            <div className={`mood-emoji-container ${moodData.bg} shadow-md`}>{moodData.label}</div>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const moodId = moodHistory[getDateKey(date)];
      if (moodId) return moods[moodId].color;
      if (getDateKey(date) === getDateKey(new Date())) return "today-tile";
    }
    return "";
  };

  return (
    <>
      {!currentMood && <MoodCheckin setCurrentMood={setCurrentMood} />}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pb-24">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-sm mb-6">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors"><ArrowLeft size={24} className="text-gray-700" /></button>
          <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors"><Settings size={24} className="text-gray-700" /></button>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img src="https://i.pinimg.com/736x/79/36/92/79369228bd462e6c6de34006b4947a5d.jpg" alt="profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
              {mood && <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full ${mood.bg} border-2 border-white flex items-center justify-center text-2xl shadow-md`}>{mood.label}</div>}
            </div>
            <p className="font-poppins text-2xl mt-6 text-gray-800">Jennifer <span className="font-bold">Lorence</span></p>
            {mood && (
              <div className="mt-4 flex items-center space-x-2">
                <span className="text-sm text-gray-600">Today's mood:</span>
                <span
                  onClick={() => { localStorage.removeItem("currentMood"); localStorage.removeItem("lastCheckin"); setCurrentMood(null); }}
                  className={`py-2 px-4 rounded-xl border ${mood.border} ${mood.bg} text-white font-medium cursor-pointer hover:opacity-90 transition-opacity text-sm`}
                >{mood.label} {currentMood}</span>
              </div>
            )}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <Calendar
            tileContent={tileContent}
            tileClassName={tileClassName}
            className="custom-mood-calendar mx-auto"
            calendarType="gregory"
            selectRange={false}
            value={null}
            onClickDay={() => {}}
          />
        </div>

        {/* Mood Graph */}
        <MoodGraph moodHistory={moodHistory} />
      </div>

      <style jsx global>{`
        .custom-mood-calendar {
          width: 100%;
          max-width: 400px;
          border: none;
          background: transparent;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .custom-mood-calendar .react-calendar__navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: black;
          border-radius: 16px;
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .custom-mood-calendar .react-calendar__navigation button {
          background: none;
          border: none;
          color: white;
          font-weight: 600;
          padding: 0.5rem 0.75rem;
          border-radius: 10px;
          transition: all 0.2s ease;
          min-width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-mood-calendar .react-calendar__navigation button:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .custom-mood-calendar .react-calendar__navigation button:disabled {
          background: rgba(255, 255, 255, 0.15);
          opacity: 0.6;
        }

        .custom-mood-calendar .react-calendar__navigation__label {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .custom-mood-calendar .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-size: 0.7rem;
          font-weight: 700;
          color: #6b7280;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .custom-mood-calendar .react-calendar__month-view__weekdays__weekday {
          padding: 0.5rem;
          text-align: center;
        }

        .custom-mood-calendar .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
          font-size: 0.75rem;
        }

        .custom-mood-calendar .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .custom-mood-calendar .react-calendar__tile {
          height: 50px;
          width: 100% !important;
          max-width: 50px !important;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
          margin: 0 auto;
          position: relative;
        }

        .custom-mood-calendar .react-calendar__tile:hover {
          background: #e2e8f0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .custom-mood-calendar .react-calendar__tile:active {
          transform: translateY(0);
        }

        .custom-mood-calendar .react-calendar__tile abbr {
          font-size: 0.55rem;
          font-weight: 600;
          color: #374151;
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }

        .custom-mood-calendar .react-calendar__tile--now {
          background: linear-gradient(135deg, var(--today-gradient-start, #10b981), var(--today-gradient-end, #059669));
          border-color: var(--today-border, #10b981);
          color: white !important;
        }

        .custom-mood-calendar .react-calendar__tile--now abbr {
          color: white !important;
          background: rgba(255, 255, 255, 0.2);
          font-weight: 700;
        }

        .custom-mood-calendar .react-calendar__tile--active {
          background: none !important;
          color: white !important;
          border-color: #3b82f6;
        }

        .mood-emoji-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-top: 8px;
          font-size: 1.2rem;
        }

        .custom-mood-calendar .react-calendar__month-view__days__day--neighboringMonth {
          opacity: 0.4;
        }

        .custom-mood-calendar .react-calendar__month-view__days__day--neighboringMonth abbr {
          color: '9ca3af';
        }

        .custom-mood-calendar .react-calendar__viewContainer {
          padding: 0.5rem;
        }

        .custom-mood-calendar .react-calendar__month-view {
          padding: 0.5rem;
        }

        .custom-mood-calendar .react-calendar__tile--active,
        .custom-mood-calendar .react-calendar__tile:focus,
        .custom-mood-calendar .react-calendar__tile--hover {
          background: none !important;
          color: inherit !important;
          border-color: #e2e8f0 !important;
          outline: none !important;
        }

        .custom-mood-calendar .today-tile {
          background: linear-gradient(135deg, var(--today-gradient-start, #10b981), var(--today-gradient-end, #059669));
          border-color: var(--today-border, #10b981);
          color: white !important;
        }
      `}</style>
    </>
  );
};

export default Profile;