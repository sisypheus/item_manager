module.exports = {
  purge: {
    enabled: true,
    content: [
      "./src/**/*.{html,ts}",
      "./projects/**/*.{html,ts}"
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      alignItems: ['last'],
    },
    plugins: [],
  }
}
