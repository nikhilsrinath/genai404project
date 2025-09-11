import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import Firebase auth

const Welcome = () => {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Check for localStorage image first, then fallback to Firebase photoURL
        const storedImage = localStorage.getItem(`profile_image_${currentUser.uid}`);
        setUser({
          displayName: currentUser.displayName || 'Guest',
          photoURL: storedImage || currentUser.photoURL || 'https://i.pinimg.com/736x/79/36/92/79369228bd462e6c6de34006b4947a5d.jpg',
        });
      } else {
        // No user is signed in
        setUser({
          displayName: 'Guest',
          photoURL: 'https://i.pinimg.com/736x/79/36/92/79369228bd462e6c6de34006b4947a5d.jpg',
        });
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Show loading state while user data is being fetched
  if (!user) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex-col">
          <p className="font-lato text-[15px] top-1 relative">👋Hello!</p>
          <h1 className="font-poppins text-[20px] font-semibold">Loading...</h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-col">
        <p className="font-lato text-[15px] top-1 relative">👋Hello!</p>
        <h1 className="font-poppins text-[20px] font-semibold">{user.displayName}</h1>
      </div>
      <img
        src={user.photoURL}
        alt={`${user.displayName}'s profile`}
        className="rounded-full w-12 h-12 object-cover"
      />
    </div>
  );
};

export default Welcome;