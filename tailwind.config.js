<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['San Francisco', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
=======
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        baloo: ["'Baloo 2'", "cursive"],
        lato: ["Lato", "sans-serif"], // custom class
      },
    },
  },
  plugins: [],
};
>>>>>>> sugan
