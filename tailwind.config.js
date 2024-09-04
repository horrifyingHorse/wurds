const { Cedarville_Cursive, Dosis } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        Cedarville: ["Cedarville Cursive"],
        Dosis: ["Dosis"],
        Zain: ["Zain"],
        Bebas: ["Bebas Neue"],
        Raleway: ["Raleway"],
      }
    },
  },
  safelist: [
    'h-16', 'h-20', 'h-30', 'h-40', 'h-50', 'h-60',
    'w-10', 'w-20', 'w-30', 'w-40', 'w-50', 'w-60',
    'px-8', 'pr-6',
    'hidden', 'text-slate-50', 'text-transparent',
    'bg-green-300', 'bg-transparent'
  ],

  plugins: [],
};
