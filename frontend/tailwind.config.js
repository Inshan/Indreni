/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: 'true',
      padding: {
        DEFAULT: '1rem'
      },
      screens: {
        sm: '410px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      }
    },
    extend: {
      width: {
        '128': '32rem',
        '256': '64rem',
        'cont': '86rem'
      },
      height: {
        '128': '32rem',
        '256': '64rem'
      },
      colors: {
        blue: '#1450A3',
        secondaryblue: '#ABC9FF',
        yellow: '#FFC436',
        lightblue: '#F9F9F9'
      },
      transitionProperty: {
        'height': 'height',
      },
      keyframes: {
        height: {
          '0%': { height: '0px' },
          '80%': { height: '300px' },
        },
        height2: {
          '0%': { height: '0px' },
          '50%': { height: '138px' },
        },
      },
      animation: {
        'height': 'height 0.4s linear',
        'height2': 'height2 0.4s linear',
      },
    },
    
  },
  plugins: [],
}

