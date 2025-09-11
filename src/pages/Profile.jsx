import React, { useState, useEffect } from "react";
import { ArrowLeft, Settings, Upload, Check, X } from "lucide-react";
import Calendar from "react-calendar";
import MoodCheckin from "./MoodCheckin";
import "react-calendar/dist/Calendar.css";
import { auth, provider, signInWithPopup } from "../firebase"; // Import Firebase config
import { getDatabase, ref, set, onValue, push } from "firebase/database";

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
                  left: '48px'
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

const MoodDistribution = ({ moodHistory }) => {
  const [timeRange, setTimeRange] = useState(30); // 7, 30, or 90 days
  const [hoveredMood, setHoveredMood] = useState(null);

  const calculateDistribution = () => {
    const pastDates = getPastDates(timeRange);
    const moodCounts = {
      happy: 0,
      calm: 0,
      anxious: 0,
      sad: 0,
      angry: 0
    };

    pastDates.forEach(date => {
      const mood = moodHistory[date];
      if (mood && moodCounts.hasOwnProperty(mood)) {
        moodCounts[mood]++;
      }
    });

    const totalDays = Object.values(moodCounts).reduce((sum, count) => sum + count, 0);
    
    if (totalDays === 0) {
      return Object.keys(moodCounts).map(mood => ({
        mood,
        count: 0,
        percentage: 0,
        ...moods[mood]
      }));
    }

    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      percentage: Math.round((count / totalDays) * 100),
      ...moods[mood]
    })).sort((a, b) => b.percentage - a.percentage);
  };

  const distribution = calculateDistribution();
  const totalDays = distribution.reduce((sum, item) => sum + item.count, 0);

  const donutSize = 120;
  const donutStrokeWidth = 12;
  const donutRadius = (donutSize - donutStrokeWidth) / 2;
  const donutCircumference = 2 * Math.PI * donutRadius;

  let accumulatedPercentage = 0;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Mood Distribution</h3>
        <div className="flex space-x-2">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                timeRange === days
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {days} days
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative" style={{ width: donutSize, height: donutSize }}>
          <svg width={donutSize} height={donutSize} className="transform -rotate-90">
            {distribution.map((item, index) => {
              const strokeDasharray = (item.percentage / 100) * donutCircumference;
              const strokeDashoffset = (accumulatedPercentage / 100) * donutCircumference;
              accumulatedPercentage += item.percentage;

              return (
                <circle
                  key={item.mood}
                  cx={donutSize / 2}
                  cy={donutSize / 2}
                  r={donutRadius}
                  fill="none"
                  stroke={getMoodGradientStart(item)}
                  strokeWidth={donutStrokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={-strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                  style={{
                    opacity: hoveredMood === null || hoveredMood === item.mood ? 1 : 0.3,
                    filter: hoveredMood === null || hoveredMood === item.mood ? 'none' : 'blur(1px)'
                  }}
                  onMouseEnter={() => setHoveredMood(item.mood)}
                  onMouseLeave={() => setHoveredMood(null)}
                />
              );
            })}
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-gray-800">
              {totalDays}
            </span>
            <span className="text-xs text-gray-500">days logged</span>
          </div>
        </div>

        <div className="flex-1 space-y-3 w-[100%]">
          {distribution.map((item) => (
            <div
              key={item.mood}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                hoveredMood === null || hoveredMood === item.mood
                  ? 'bg-gray-50 scale-105 shadow-sm'
                  : 'bg-gray-50 opacity-60'
              }`}
              onMouseEnter={() => setHoveredMood(item.mood)}
              onMouseLeave={() => setHoveredMood(null)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bg} text-white text-lg`}>
                  {item.label}
                </div>
                <div>
                  <span className="font-medium text-gray-800 capitalize">{item.mood}</span>
                  <span className="block text-xs text-gray-500">{item.count} days</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ease-out`}
                    style={{
                      width: `${item.percentage}%`,
                      background: `linear-gradient(90deg, ${getMoodGradientStart(item)}, ${getMoodGradientEnd(item)})`
                    }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-700 w-10 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalDays > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <p className="text-sm text-gray-700 text-center">
            {hoveredMood ? (
              <>
                You were <span className="font-semibold capitalize">{hoveredMood}</span> on{' '}
                <span className="font-semibold">{distribution.find(m => m.mood === hoveredMood)?.count}</span> of the last{' '}
                <span className="font-semibold">{timeRange}</span> days
              </>
            ) : (
              <>
                Your most frequent mood was{' '}
                <span className="font-semibold capitalize">{distribution[0]?.mood}</span> at{' '}
                <span className="font-semibold">{distribution[0]?.percentage}%</span> of the time
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

const ProfileSettings = ({ user, onClose, onSave }) => {
  const [newName, setNewName] = useState(user.displayName || '');
  const [newPhoto, setNewPhoto] = useState(null);
  const [preview, setPreview] = useState(localStorage.getItem(`profile_image_${user.uid}`) || user.photoURL);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result); // Set preview to base64 string
      };
      reader.onerror = () => {
        setError("Failed to read image file.");
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      let photoURL = user.photoURL;
      if (newPhoto) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64Image = event.target.result;
          localStorage.setItem(`profile_image_${user.uid}`, base64Image); // Save to localStorage
          photoURL = base64Image;
          await onSave(newName, photoURL);
          setSaving(false);
        };
        reader.onerror = () => {
          setError("Failed to process image.");
          setSaving(false);
        };
        reader.readAsDataURL(newPhoto);
      } else {
        await onSave(newName, photoURL);
        setSaving(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save changes. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md m-4 relative shadow-2xl transform transition-all scale-100 opacity-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Edit Profile</h2>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img 
              src={preview || "https://i.pinimg.com/736x/79/36/92/79369228bd462e6c6de34006b4947a5d.jpg"} 
              alt="profile preview" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-4"
            />
            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-all">
              <Upload size={20} className="text-gray-600" />
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            id="username"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter your username"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <button 
          onClick={handleSave} 
          disabled={saving || (!newName && !newPhoto)}
          className={`w-full py-3 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 ${
            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 hover:shadow-md'
          }`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
          {!saving && <Check size={20} />}
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);

  // Handle Firebase Authentication and load profile image from localStorage
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const storedImage = localStorage.getItem(`profile_image_${user.uid}`);
        setUser({
          ...user,
          photoURL: storedImage || user.photoURL || "https://i.pinimg.com/736x/79/36/92/79369228bd462e6c6de34006b4947a5d.jpg"
        });
      } else {
        setUser(null);
        setMoodHistory({});
        setCurrentMood(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Check if mood check-in is needed
  useEffect(() => {
    const lastCheckin = localStorage.getItem("lastCheckin");
    const now = new Date();
    const todayKey = getDateKey(now);

    if (!lastCheckin) {
      setShowCheckin(true);
    } else {
      const lastCheckinDate = new Date(lastCheckin);
      const lastKey = getDateKey(lastCheckinDate);
      const diffHours = (now - lastCheckinDate) / (1000 * 60 * 60);

      if (lastKey !== todayKey || diffHours >= 24) {
        localStorage.removeItem("lastCheckin");
        setShowCheckin(true);
      } else {
        setShowCheckin(false);
      }
    }
  }, []);

  // Fetch mood history from Firebase
  useEffect(() => {
    if (!user) return;
    const db = getDatabase();
    const moodsRef = ref(db, `users/${user.uid}/calendars`);
    const unsubscribe = onValue(moodsRef, (snapshot) => {
      if (snapshot.exists()) {
        const raw = snapshot.val();
        const parsed = {};

        Object.entries(raw).forEach(([date, moodsObj]) => {
          if (moodsObj) {
            const latest = Object.values(moodsObj)
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
            if (latest?.mood) {
              parsed[date] = latest.mood;
            }
          }
        });

        setMoodHistory(parsed);

        const todayKey = getDateKey(new Date());
        setCurrentMood(parsed[todayKey] || null);
      } else {
        setMoodHistory({});
        setCurrentMood(null);
      }
    }, (error) => {
      console.error("Error fetching mood history:", error);
      setError("Failed to load mood data. Please try again.");
    });

    return () => unsubscribe();
  }, [user]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Failed to sign in. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setMoodHistory({});
      setCurrentMood(null);
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Failed to sign out. Please try again.");
    }
  };

  const handleProfileSave = async (newName, newPhotoURL) => {
    try {
      await auth.currentUser.updateProfile({
        displayName: newName,
        photoURL: newPhotoURL
      });
      setUser({ ...user, displayName: newName, photoURL: newPhotoURL });
      setShowSettings(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; // Handled in the settings component
    }
  };

  const handleMoodSubmit = async (selectedMood) => {
    if (!user) return;

    const db = getDatabase();
    const todayKey = getDateKey(new Date());

    try {
      const moodData = moodOptions.find((m) => m.id === selectedMood);
      if (!moodData) {
        console.error("Invalid mood selected:", selectedMood);
        return;
      }

      await push(ref(db, `users/${user.uid}/calendars/${todayKey}`), {
        mood: moodData.id,
        label: moodData.emoji,
        bg: moodData.gradient,
        timestamp: new Date().toISOString(),
      });

      localStorage.setItem("lastCheckin", new Date().toISOString());
      setCurrentMood(selectedMood);
      setShowCheckin(false);
    } catch (error) {
      console.error("Error saving mood:", error);
      setError("Failed to save mood. Please try again.");
    }
  };

  const handleMoodReset = async () => {
    if (!user) return;
    const db = getDatabase();
    const todayKey = getDateKey(new Date());
    try {
      await set(ref(db, `users/${user.uid}/calendars/${todayKey}`), null);
      setCurrentMood(null);
      localStorage.removeItem("lastCheckin");
      setShowCheckin(true);
    } catch (error) {
      console.error("Error resetting mood:", error);
      setError("Failed to reset mood. Please try again.");
    }
  };

  const mood = currentMood ? moods[currentMood] : null;

  useEffect(() => {
    if (mood) {
      document.documentElement.style.setProperty('--today-gradient-start', getMoodGradientStart(mood));
      document.documentElement.style.setProperty('--today-gradient-end', getMoodGradientEnd(mood));
      document.documentElement.style.setProperty('--today-border', getMoodBorder(mood));
    } else {
      document.documentElement.style.setProperty('--today-gradient-start', '#10b981');
      document.documentElement.style.setProperty('--today-gradient-end', '#059669');
      document.documentElement.style.setProperty('--today-border', '#10b981');
    }
  }, [mood]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const moodId = moodHistory[getDateKey(date)];
      if (moodId && moods[moodId]) {
        const moodData = moods[moodId];
        return (
          <div className="flex items-center justify-center h-full pt-3">
            <div className={`mood-emoji-container ${moodData.bg} shadow-md`}>
              {moodData.label}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const moodId = moodHistory[getDateKey(date)];
      if (moodId && moods[moodId]) {
        return moods[moodId].color;
      }
      if (getDateKey(date) === getDateKey(new Date())) {
        return "today-tile";
      }
    }
    return "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Please Sign In</h2>
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showCheckin && <MoodCheckin onSubmit={handleMoodSubmit} user={user} />}
      {showSettings && <ProfileSettings user={user} onClose={() => setShowSettings(false)} onSave={handleProfileSave} />}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pb-24">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-sm mb-6">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors"><ArrowLeft size={24} className="text-gray-700" /></button>
          <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
          <button onClick={() => setShowSettings(true)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img src={user.photoURL} alt="profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
              {mood && <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full ${mood.bg} border-2 border-white flex items-center justify-center text-2xl shadow-md`}>{mood.label}</div>}
            </div>
            <p className="font-poppins text-2xl mt-6 text-gray-800">{user.displayName || "User"} <span className="font-bold"></span></p>
            {mood && (
              <div className="mt-4 flex items-center space-x-2">
                <span className="text-sm text-gray-600">Today's mood:</span>
                <span
                  onClick={handleMoodReset}
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

        {/* Mood Distribution */}
        <MoodDistribution moodHistory={moodHistory} />
      </div>

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
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
          color: #9ca3af;
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