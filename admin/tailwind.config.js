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
            950: '#12151B',
            900: '#181B22',
            850: '#1E232E',
            800: '#202531',
            700: '#2A303C',
            600: '#3A4252',
          },
          navy: {
            950: '#12151B',
            900: '#181B22',
            850: '#1E232E',
            800: '#202531',
            700: '#2A303C',
            600: '#3A4252',
          },
          bronze: {
            800: '#664B20',
            700: '#7D5D2A',
            600: '#A88548',
            500: '#B8914B',
            400: '#D4AF37',
            300: '#E0C27E',
            200: '#F0DEC0',
            100: '#FAF2DF',
            50:  '#FDFBF5',
          },
          emerald: {
            800: '#664B20',
            700: '#7D5D2A',
            600: '#A88548',
            500: '#B8914B',
            400: '#D4AF37',
            100: '#FAF2DF',
            50:  '#FDFBF5',
          },
          gold: {
            800: '#664B20',
            700: '#7D5D2A',
            600: '#A88548',
            500: '#B8914B',
            400: '#D4AF37',
            300: '#E0C27E',
            100: '#FAF2DF',
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
