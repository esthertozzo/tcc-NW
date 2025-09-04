/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#efefef',
        softPink: '#fce4ec',
        lighterPink: '#f3d7d4',
        mediumPink: '#db9f95',
        pinkBrown: '#925858',
        mainWine: '#702c2b',
        mainBrown: '#6d4c41',
        inative: '#cfcfcfff',
        mainRed: '#c56869',
        mainGray: 'rgb(145, 145, 145)',
      },
      fontSize:{
        h1: '2rem',
        h2: '1.7rem',
        h3: '1.3rem'
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')
    , require('@tailwindcss/forms')
    , require('@tailwindcss/line-clamp')
    , require('@tailwindcss/typography')
  ],
}
