module.exports = wallaby => ({
  files: [
    'src/**/*',
    'test/**/*',
    '!test/**/*.test.js',
    '.babelrc'
  ],
  
  tests: [
    'test/**/*.test.js',
  ],
  
  env: {
    type: 'node',
  },
  
  compilers: {
    '**/*.js': wallaby.compilers.babel({
                                         // babel options
                                         // like `stage: n` for Babel 5.x or `presets: [...]` for Babel 6
                                         // (no need to duplicate .babelrc, if you have it, it will be automatically loaded)
                                       }),
    
  }
  
})
