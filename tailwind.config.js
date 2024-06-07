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
        secondary: "#506171",
        brand: "#3B82F6",
        sucess: "#00B42A",
        failure: "#B71C1C",
        warning: "#FBBC05",
        info: "#2196F3",
        text: "#424242",
      },
    },
  },
  plugins: [],
}