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
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
