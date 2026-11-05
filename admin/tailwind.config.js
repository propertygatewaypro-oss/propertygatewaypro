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
            base: '#F1F5F9', // Crisp Slate 100 for admin work surface
            surface: '#FFFFFF',
            subtle: '#E2E8F0',
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
