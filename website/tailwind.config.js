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
          navy: {
            950: '#060D17',
            900: '#0A192F',
            800: '#112240',
            700: '#1D3557',
            600: '#233F68',
          },
          emerald: {
            700: '#047857',
            600: '#059669',
            500: '#10B981',
            100: '#D1FAE5',
            50:  '#ECFDF5',
          },
          gold: {
            700: '#99733E',
            600: '#B88E4C',
            500: '#C5A880',
            100: '#FBF5EB',
          },
          canvas: {
            base: '#F8FAFC',
            surface: '#FFFFFF',
            subtle: '#F1F5F9',
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
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'modal': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
        'floating-cta': '0 4px 16px rgba(37, 211, 102, 0.35)',
      }
    },
  },
  plugins: [],
}
