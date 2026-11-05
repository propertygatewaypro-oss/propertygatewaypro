/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          obsidian: {
            950: '#0A0C10',
            900: '#0F1117',
            850: '#141720',
            800: '#1B1E28',
            700: '#272B38',
            600: '#383C4B',
          },
          navy: {
            950: '#0A0C10',
            900: '#0F1117',
            850: '#141720',
            800: '#1B1E28',
            700: '#272B38',
            600: '#383C4B',
          },
          bronze: {
            800: '#754B27',
            700: '#8E5D34',
            600: '#B37D4E',
            500: '#C58F5E',
            400: '#D8A67B',
            300: '#E4BF9C',
            200: '#ECD6C3',
            100: '#F6ECE1',
            50:  '#FAF4EE',
          },
          emerald: {
            800: '#754B27',
            700: '#8E5D34',
            600: '#B37D4E',
            500: '#C58F5E',
            400: '#D8A67B',
            100: '#F6ECE1',
            50:  '#FAF4EE',
          },
          gold: {
            700: '#8E5D34',
            600: '#B37D4E',
            500: '#C58F5E',
            100: '#F6ECE1',
          },
          canvas: {
            base: '#F4F2ED', // Clean executive stone surface
            surface: '#FFFFFF',
            subtle: '#EAE6DD',
          },
          whatsapp: {
            DEFAULT: '#25D366',
            hover: '#20BA56',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
