module.exports = {
  files: [
    './svgs/*.svg'
  ],
  fontName: 'bruga-music-fonts',
  classPrefix: 'b-icon-',
  baseSelector: '.b-icon',
  types: ['woff2', 'woff', 'ttf', 'svg'],
  embed: process.env.NODE_ENV === 'development',
  dest: '/fonts',
  cssDest: '/styles',
  cssTemplate: './bruga-font.css.hbs',
  fileName: '[fontname].[ext]?[chunkhash]'
};
