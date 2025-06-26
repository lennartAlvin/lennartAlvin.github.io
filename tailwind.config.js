/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00f0ff',
          magenta: '#ff00c8',
          blue: '#0080ff',
          green: '#00ff80',
          purple: '#a100ff',
          pink: '#ff0080',
        },
        dark: {
          base: '#0d0d0d',
          card: '#1a1a1a',
          surface: '#121212',
          border: '#333333',
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'glitch': 'glitch 0.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 5px rgba(0, 240, 255, 0.6), 0 0 10px rgba(161, 0, 255, 0.4)',
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.8), 0 0 30px rgba(161, 0, 255, 0.6)',
          },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'cursor-blink': {
          '0%, 50%': { opacity: 1 },
          '51%, 100%': { opacity: 0 },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
} 