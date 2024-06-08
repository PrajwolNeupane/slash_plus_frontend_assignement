/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      fontWeight: {
        "semibold": "600",
        "medium": "500",
        "regular": "400",
        light: "300"
      },
      fontSize: {
        xs: "0.7rem",
        sm: "0.8rem",
        md: "0.9rem",
        base: "1rem",
        lg: "1.15rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      colors: {
        primary: "#24394d",
        secondary: "#d4a502",
        sucess: "#00B42A",
        failure: "#B71C1C",
        warning: "#FBBC05",
        info: "#2196F3",
        text: "#424242",
      },
      screens: {
        "2xl": "1440px",
        xl: "1280px",
        lg: "980px",
        rg: "780px",
        md: "580px",
        sm: "420px",
        xs: "300px",
      },
    },
  },
  plugins: [],
}