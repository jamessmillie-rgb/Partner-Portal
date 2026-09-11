export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'tv-dark': '#0a0a0a',
        'tv-teal': '#2ce4ad',
        'tv-teal-dark': '#24d4a0'
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
