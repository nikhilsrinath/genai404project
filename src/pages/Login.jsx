import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96 text-center">
        {/* Soul Logo */}
        <div className="mb-6">
          <img
            src="path_to_soul_logo.png" // Replace with the actual path to 'soul.png'
            alt="Soul Logo"
            className="w-40 mx-auto"
          />
          <div className="text-sm text-gray-500 mt-2">Find yourself here! 👤</div>
        </div>

        {/* Doll-like Structure (Soul Emoji) */}
        <div className="mb-10">
          <img
            src="path_to_soul_doll.png" // Replace with the actual path to the doll emoji image
            alt="Soul Doll"
            className="w-40 h-40 mx-auto rounded-full"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded mb-3 text-center"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4 text-center"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        {/* Sign In Buttons */}
        <div className="mt-6">
          <div className="mb-4">
            <button className="flex items-center justify-center bg-white border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-full hover:bg-blue-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/48/Google_Logo_2013.png"
                alt="Google"
                className="w-5 h-5 mr-3"
              />
              Sign in with Google
            </button>
          </div>
          <div>
            <button className="flex items-center justify-center bg-white border-2 border-red-600 text-red-600 py-2 px-4 rounded-full hover:bg-red-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/48/Google_Logo_2013.png" // Replace with Gmail logo if available
                alt="Gmail"
                className="w-5 h-5 mr-3"
              />
              Sign in with Email
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-xs text-gray-400">
          All rights reserved @ <span className="font-bold text-blue-600">GenAI 404</span>
        </div>
      </div>
    </div>
  );
}
