module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'postcss-easy-import': {},
    'postcss-strip-inline-comments': {},
    precss: {
      browsers: ['last 2 versions'],
      stage: 2,
      features: {
        'nesting-rules': true
      }
    },
    autoprefixer: {}
  }
}
