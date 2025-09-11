import React, { useState, useEffect, useRef } from "react";

const Thumbnail = () => {
  const images = [
    "https://i.pinimg.com/1200x/37/e3/68/37e368b44ca3154082c18372f757a566.jpg",
    "https://i.pinimg.com/736x/31/b4/1e/31b41e4fc59107ca1bedfd08a6b5fe1e.jpg",
    "https://i.pinimg.com/736x/41/48/c6/4148c6ceaa181d4442b1331b15fe233c.jpg",
    "https://i.pinimg.com/736x/3b/9b/86/3b9b863cbf1386740998b6be7f8b8331.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const endX = useRef(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle drag/swipe start
  const handleTouchStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // Handle drag/swipe end
  const handleTouchEnd = (e) => {
    endX.current = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = startX.current - endX.current;

    if (delta > 50) {
      // Swipe left → next
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (delta < -50) {
      // Swipe right → previous
      setCurrentIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Slider wrapper */}
      <div
        className="w-[100%] overflow-hidden rounded-lg shadow-md "
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-auto object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex space-x-2 mt-3">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
              index === currentIndex ? "bg-gray-200" : "bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
