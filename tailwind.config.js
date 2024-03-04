module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      'sm': '430px',
      // => @media (min-width: 430px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      'primary': {
        'purple': 'hsl(259, 100%, 65%)',
        'red': 'hsl(0, 100%, 67%)'
      },
      'neutral': {
        'white': 'hsl(0, 0%, 100%)',
        'off-white': 'hsl(0, 0%, 94%)',
        'grey': 'hsl(0, 0%, 86%)',
        'smoke': 'hsl(0, 1%, 44%)',
        'black': 'hsl(0, 0%, 8%)'
      }
    },
    extend: {},
  },
  plugins: [],
}
