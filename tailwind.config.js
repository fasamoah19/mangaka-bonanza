/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'anton': ['Anton', 'sans-serif'],
      'libreFranklin': ['Libre Franklin', 'sans-serif']
    },
    extend: {
      objectPosition: {
        'center-40-per': 'center 40%',
      },
      height: {
        '112': '28rem' /** 448px */,
        '420px': '420px'
      },
      space: {
        'auto': 'auto'
      },
      colors: {
        siteGray: "#787878",
        siteLightGray: "#D9D9D9",
        siteRed: "#D21416",
        mangaCard: 'rgba(217, 217, 217, 0.21)',
        siteBlue: "#A6E1FA",
        cartItemBg: 'rgba(217, 217, 217, 0.46)',
        inputBg: 'rgba(217, 217, 217, 0.55)',
      }
    }
  },
  plugins: [],
}
