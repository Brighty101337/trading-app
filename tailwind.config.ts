const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(52, 211, 153, 0.15), 0 20px 45px rgba(15, 23, 42, 0.5)'
      },
      colors: {
        shell: '#020817',
        panel: '#0f172a',
        accent: '#34d399'
      }
    }
  },
  plugins: []
};
