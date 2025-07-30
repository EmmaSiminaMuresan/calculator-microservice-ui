// postcss.config.cjs
module.exports = {
  plugins: {
    // în loc de 'tailwindcss': {},
    '@tailwindcss/postcss': {},

    // păstrezi autoprefixer
    autoprefixer: {},
  },
};
