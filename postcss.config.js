// postcss.config.js
module.exports = {
  plugins: {
    // ← the new Tailwind/PostCSS bridge
    '@tailwindcss/postcss': {},
    // autoprefixer is still here
    autoprefixer: {},
  },
}
