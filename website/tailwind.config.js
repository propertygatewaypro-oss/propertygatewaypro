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
          // Architectural Graphite Slate (Replacing Pitch Black)
          obsidian: {
            950: '#12151B',
            900: '#181B22', // Primary Slate Surface
            850: '#1E232E',
            800: '#202531',
            700: '#2A303C',
            600: '#3A4252',
          },
          // Alias navy to slate
          navy: {
            950: '#12151B',
            900: '#181B22',
            850: '#1E232E',
            800: '#202531',
            700: '#2A303C',
            600: '#3A4252',
          },
          // Luxury Metallic Brushed Gold (Client Reference Palette)
          bronze: {
            800: '#664B20',
            700: '#7D5D2A', // Deep Gold Bronze
            600: '#A88548', // Primary Metallic Gold
            500: '#B8914B',
            400: '#D4AF37', // Radiant 24K Gold
            300: '#E0C27E', // Luminous Highlight
            200: '#F0DEC0',
            100: '#FAF2DF',
            50:  '#FDFBF5',
          },
          // Alias emerald to metallic gold
          emerald: {
            800: '#664B20',
            700: '#7D5D2A',
            600: '#A88548',
            500: '#B8914B',
            400: '#D4AF37',
            100: '#FAF2DF',
            50:  '#FDFBF5',
          },
          // Radiant Gold
          gold: {
            800: '#664B20',
            700: '#7D5D2A',
            600: '#A88548',
            500: '#B8914B',
            400: '#D4AF37',
            300: '#E0C27E',
            100: '#FAF2DF',
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
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 17, 23, 0.04), 0 1px 2px -1px rgba(15, 17, 23, 0.04)',
        'card-hover': '0 12px 30px -6px rgba(15, 17, 23, 0.09), 0 8px 12px -4px rgba(15, 17, 23, 0.04)',
        'modal': '0 25px 50px -12px rgba(15, 17, 23, 0.25)',
        'floating-cta': '0 4px 16px rgba(37, 211, 102, 0.35)',
        'bronze-glow': '0 4px 20px -2px rgba(168, 133, 72, 0.40)',
      }
    },
  },
  plugins: [],
}
