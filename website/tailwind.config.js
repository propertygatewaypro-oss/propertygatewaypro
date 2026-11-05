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
          // Obsidian Carbon (Primary Authority & Architectural Foundations)
          obsidian: {
            950: '#0A0C10',
            900: '#0F1117', // Primary Luxury Dark
            850: '#141720',
            800: '#1B1E28',
            700: '#272B38',
            600: '#383C4B',
          },
          // Alias navy to obsidian for seamless drop-in
          navy: {
            950: '#0A0C10',
            900: '#0F1117',
            850: '#141720',
            800: '#1B1E28',
            700: '#272B38',
            600: '#383C4B',
          },
          // Warm Brushed Bronze (Primary Luxury Accent, Price Tags, CTAs)
          bronze: {
            800: '#754B27',
            700: '#8E5D34',
            600: '#B37D4E', // Primary Bronze Action Token
            500: '#C58F5E',
            400: '#D8A67B',
            300: '#E4BF9C',
            200: '#ECD6C3',
            100: '#F6ECE1',
            50:  '#FAF4EE',
          },
          // Alias emerald to bronze for smooth color transformation
          emerald: {
            800: '#754B27',
            700: '#8E5D34',
            600: '#B37D4E',
            500: '#C58F5E',
            400: '#D8A67B',
            100: '#F6ECE1',
            50:  '#FAF4EE',
          },
          // Champagne Gold (Villas & Exclusive Badges)
          gold: {
            700: '#8E5D34',
            600: '#B37D4E',
            500: '#C58F5E',
            100: '#F6ECE1',
          },
          // Travertine Alabaster Canvas (Warm Gallery Surfaces)
          canvas: {
            base: '#FAF9F6',
            surface: '#FFFFFF',
            subtle: '#F3F1EC',
            border: '#E6E3DB',
          },
          // Architectural Stone Grays
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
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 17, 23, 0.04), 0 1px 2px -1px rgba(15, 17, 23, 0.04)',
        'card-hover': '0 12px 30px -6px rgba(15, 17, 23, 0.09), 0 8px 12px -4px rgba(15, 17, 23, 0.04)',
        'modal': '0 25px 50px -12px rgba(15, 17, 23, 0.25)',
        'floating-cta': '0 4px 16px rgba(37, 211, 102, 0.35)',
        'bronze-glow': '0 4px 20px -2px rgba(179, 125, 78, 0.35)',
      }
    },
  },
  plugins: [],
}
