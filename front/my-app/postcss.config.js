module.exports = {
  theme: {
    extend: {

      keyframes: {
        gx: {
          "0%, 10%, 100%": { width: "400px" },
          "30%, 50%": { width: "500px" },
        },
      },
      animation: {
        gx: "gx 1.25s ease-in-out", // 원래 transition 속도랑 맞춤
      },
    },
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
