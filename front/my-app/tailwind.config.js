
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
        extend: {
            keyframes: {
                gx: {
                    "0%, 10%, 100%": { width: "400px" },
                    "30%, 50%": { width: "500px" },
                },
            },
            animation: {
                gx: "gx 1.25s ease-in-out",
            },
            fontFamily: {
                logo: ['TAN-NIMBUS'],
            },
        },
    },
  plugins: [require("daisyui")],
}

