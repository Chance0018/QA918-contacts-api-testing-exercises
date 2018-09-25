module.exports = wallaby => ({
  files: [
    'src/**/*',
    '!src/**/*.test.js',
  ],
  
  tests: [
    'test/**/*.test.js',
  ],
  
  env: {
    type: 'node'
  },
  
  compilers: {
    '**/*.js': wallaby.compilers.babel({
      // babel options
      // like `stage: n` for Babel 5.x or `presets: [...]` for Babel 6
      // (no need to duplicate .babelrc, if you have it, it will be automatically loaded)
    }),
    
    '**/*.ts': wallaby.compilers.typeScript({
      // TypeScript compiler specific options
      // https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
      // (no need to duplicate tsconfig.json, if you have it, it will be automatically used)
    }),
    
    '**/*.coffee': wallaby.compilers.coffeeScript({
      // CoffeeScript compiler specific options
    })
  }
  
})
