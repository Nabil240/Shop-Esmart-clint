/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  daisyui: {
    themes: ["light", "dark"],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#60a5fa',
          600: '#3b82f6',
        },
        
      },
    },
    backgroundImage: {
      'login-bg': 'url("https://res.cloudinary.com/dsh57dvqf/image/upload/v1728344693/login_n35lza.jpg")',
      'signup-bg': 'url("https://res.cloudinary.com/dsh57dvqf/image/upload/v1728346227/login2_vb7o18.jpg")',
    },
    fontFamily: {
      'exo-2': ['"Exo 2", sans-serif'],
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
