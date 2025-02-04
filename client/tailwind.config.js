/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      animation: {
        messageShowUpRight: "showUpRight 3s ease-in-out alternate",
        messageShowUpLeft: "showUpLeft 3s ease-in-out alternate",
      },
      keyframes: {
        showUpRight: {
          "0%": {
            transform: 'translateX(100vw)'
          },
          "50%,80%": {
            transform: 'translateX(0)'
          },
          "100%": {
            transform: 'translateX(100vw)'
          }
        },
        showUpLeft: {
          "0%": {
            transform: 'translateX(-100vw)'
          },
          "50%,80%": {
            transform: 'translateX(0)'
          },
          "100%": {
            transform: 'translateX(-100vw)'
          }
        },
      },

      fontFamily: {

        Almarai: ['Almarai', 'sans-serif'],
        sans: ['Poppins', 'Roboto', 'Open Sans', 'sans-serif'],


      },
      colors: {
        "ghost-white": "var(--ghost-white)",
        'dark-purple': 'var(--dark-purple)',
        'dogwood-rose': 'var(--dogwood-rose)',
        'russian-violet': 'var(--russian-violet)',
        'raisin-black': 'var(--raisin-black)',
        'dark-purple-light': 'var(--dark-purple-light)', /* A lighter shade of dark-purple */
        'dogwood-rose-light': 'var(--dogwood-rose-light)', /* A softer, pastel version */
        'russian-violet-dark': 'var(--russian-violet-dark)', /* A deeper, more dramatic tone */
        'raisin-black-light': 'var(--raisin-black-light)', /* Consistent with the CSS variable name */
        'ivory': 'var(--ivory)', /* A warm, off-white for accents */
        'cool-gray': 'var(--cool-gray)', /* Neutral complement */
        'lavender': 'var(--lavender)', /* Gentle for headers or highlights */
        'peach-puff': 'var(--peach-puff)', /* A warm highlight shade */
        'teal': 'var(--teal)', /* Cool, fresh, and balancing for gradients or hover effects*/
        'goldenrod': 'var(--goldenrod)', /* A luxurious accent color */
        "darkRed": 'var(--dark-red)',
        "brightRed": 'var(--bright-red)',
        "shadowLight": 'var(--shadow-light)',
        "shadowDark": 'var(--shadow-dark)',
        "graylight": 'var(--gray-light)',
        "graysemiTransparent": 'var(--gray-semi-transparent)',
        "grayoverlay": 'var(--gray-overlay)',
        "graymuted": 'var(--gray-muted)',
        "lightRed": 'var(--light-red)',
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
}

