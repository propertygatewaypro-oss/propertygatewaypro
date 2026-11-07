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
            600: '#C98A4B',
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
            600: '#C98A4B',
            500: '#C58F5E',
            400: '#D8A67B',
            100: '#F6ECE1',
            50:  '#FAF4EE',
          },
          gold: {
            700: '#8E5D34',
            600: '#C98A4B',
            500: '#C58F5E',
            100: '#F6ECE1',
          },
          canvas: {
            base: '#F4F2ED', // Clean executive stone surface
            surface: '#FFFFFF',
            subtle: '#EAE6DD',
          },
          stone: {
            900: '#1C1A17',
            700: '#4A463F',
            600: '#6E6962',
            500: '#8C867E',
            400: '#ABA59D',
            200: '#DDD9D2',
            100: '#EFECE6',
          },
          whatsapp: {
            DEFAULT: '#25D366',
            hover: '#20BA56',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        modal: '0 25px 50px -12px rgba(15, 17, 23, 0.25)',
      },
    },
  },
  plugins: [],
}
