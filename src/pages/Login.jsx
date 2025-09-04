import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../firebase'; // Import Firebase Authentication

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      // Simulate fake authentication
      if (username === 'test' && password === 'password123') {
        navigate('/home');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } else {
      setErrorMessage('Enter username and password!');
    }
  };

  // Google Sign-in function
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Sign in with Google popup
      const user = result.user; // Get the authenticated user data
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      // Store the user data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      // Navigate to the /userdetails page
      navigate('/userdetails');
    } catch (error) {
      setErrorMessage('Google Sign-in failed. Please try again.');
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Animated Cloud Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#0EC5EA]">
        {/* Cloud 1 */}
        <div className="absolute cloud cloud-1" style={{ top: '10%', width: '140px', height: '60px' }}>
          <div className="cloud-circle cloud-circle-1"></div>
          <div className="cloud-circle cloud-circle-2"></div>
          <div className="cloud-circle cloud-circle-3"></div>
        </div>

        {/* Cloud 2 */}
        <div className="absolute cloud cloud-2" style={{ top: '35%', width: '160px', height: '65px' }}>
          <div className="cloud-circle cloud-circle-4"></div>
          <div className="cloud-circle cloud-circle-5"></div>
          <div className="cloud-circle cloud-circle-6"></div>
        </div>

        {/* Cloud 3 */}
        <div className="absolute cloud cloud-3" style={{ top: '55%', width: '180px', height: '70px' }}>
          <div className="cloud-circle cloud-circle-7"></div>
          <div className="cloud-circle cloud-circle-8"></div>
          <div className="cloud-circle cloud-circle-9"></div>
        </div>

        {/* Cloud 4 */}
        <div className="absolute cloud cloud-4" style={{ top: '75%', width: '200px', height: '80px' }}>
          <div className="cloud-circle cloud-circle-10"></div>
          <div className="cloud-circle cloud-circle-11"></div>
          <div className="cloud-circle cloud-circle-12"></div>
        </div>
      </div>

      <div className="p-4 w-full max-w-md text-center z-10 mx-4">
        {/* Soul Logo */}
        <div className="mb-6">
          <img
            src="soul..png" // Replace with the actual path to 'soul.png'
            alt="Soul Logo"
            className="w-40 mx-auto"
          />
          <div className="text-[18px] text-gray-500 mt-2">Find yourself here! 🫂</div>
        </div>

        {/* Doll-like Structure (Soul Emoji) */}
        <div className="animate-bounce">
          <img
            src="doll.png" // Replace with the actual path to the doll emoji image
            alt="Soul Doll"
            className="w-[400px] h-auto mx-auto rounded-full"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Sign In Buttons */}
        <div className="mt-6 w-full space-y-3">
          <div>
            <button 
              className="flex items-center justify-center bg-white border-2 border-blue-500 text-blue-500 py-3 w-full rounded-xl hover:bg-blue-50 transition-all duration-300 ease-in-out shadow-sm"
              onClick={signInWithGoogle} // Trigger Google Sign-in
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
                alt="Google"
                className="w-5 h-5 mr-3"
              />
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>
          </div>
          <div>
            <button className="flex items-center justify-center bg-gray-900 border-2 border-gray-900 text-white py-3 w-full rounded-xl hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-sm">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
              </svg>
              <span className="text-sm font-medium">Sign in with Email</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-xs text-gray-600">
          All rights reserved © GenAI 404
        </footer>
      </div>

      {/* Inline styles for the cloud animation */}
      <style>
        {`
          .cloud {
            background: white;
            border-radius: 100px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            opacity: 0.9;
          }

          .cloud-circle {
            position: absolute;
            background: white;
            border-radius: 50%;
          }

          .cloud-1 {
            animation: moveCloud 15s linear infinite;
          }

          .cloud-2 {
            animation: moveCloud 18s linear infinite;
            animation-delay: 3s;
          }

          .cloud-3 {
            animation: moveCloud 20s linear infinite;
            animation-delay: 5s;
          }

          .cloud-4 {
            animation: moveCloud 22s linear infinite;
            animation-delay: 7s;
          }

          .cloud-circle-1 {
            width: 55px;
            height: 55px;
            top: -25px;
            left: 15px;
          }

          .cloud-circle-2 {
            width: 45px;
            height: 45px;
            top: -20px;
            right: 15px;
          }

          .cloud-circle-3 {
            width: 35px;
            height: 35px;
            top: -15px;
            left: 40px;
          }

          .cloud-circle-4 {
            width: 60px;
            height: 60px;
            top: -30px;
            left: 20px;
          }

          .cloud-circle-5 {
            width: 50px;
            height: 50px;
            top: -25px;
            right: 20px;
          }

          .cloud-circle-6 {
            width: 40px;
            height: 40px;
            top: -20px;
            left: 50px;
          }

          .cloud-circle-7 {
            width: 65px;
            height: 65px;
            top: -35px;
            left: 10px;
          }

          .cloud-circle-8 {
            width: 55px;
            height: 55px;
            top: -30px;
            right: 10px;
          }

          .cloud-circle-9 {
            width: 45px;
            height: 45px;
            top: -20px;
            left: 35px;
          }

          .cloud-circle-10 {
            width: 70px;
            height: 70px;
            top: -40px;
            left: 15px;
          }

          .cloud-circle-11 {
            width: 60px;
            height: 60px;
            top: -35px;
            right: 15px;
          }

          .cloud-circle-12 {
            width: 50px;
            height: 50px;
            top: -25px;
            left: 45px;
          }

          @keyframes moveCloud {
            0% {
              left: -20%;
            }
            100% {
              left: 120%;
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .animate-bounce {
            animation: bounce 1s infinite;
          }
        `}
      </style>
    </div>
  );
}
