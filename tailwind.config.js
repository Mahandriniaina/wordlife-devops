/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.{js,jsx,ts,tsx}',
    './app/(tabs)/.*.{js,jsx,ts,tsx}', 
    './App.{js,jsx,ts,tsx}',
    './App/(tabs)/.*.{js,jsx,ts,tsx}', // Échappez les caractères spéciaux
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
