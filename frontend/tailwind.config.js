/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#305EFF',
          purple: '#8A4CFF',
        },
        background: {
          main: '#F3F4F6',
          card: '#FFFFFF',
        },
        text: {
          dark: '#1F2937',
          light: '#6B7280',
        },
        success: '#22C55E',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        heading: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #305EFF, #8A4CFF)',
      },
    },
  },
  plugins: [],
}

