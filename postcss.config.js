module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'postcss-easy-import': {},
    'postcss-custom-media': {},
    'precss': {},
    'autoprefixer': {},
    'cssnano': {preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
            }]}
  }
}
