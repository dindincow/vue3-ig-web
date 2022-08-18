module.exports = {
  // Tailwind 作用範圍只在 html 和 vue,js 的檔案
  content: ['./index.html', './src/**/*.{vue,js}'],

  theme: {
    extend: {
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.45rem', '0.55rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem']
      }
    }
  },
  plugins: []
}
