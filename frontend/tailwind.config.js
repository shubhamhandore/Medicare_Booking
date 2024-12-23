/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,html,css}",
    "./pages/**/*.{html,js,jsx,css}",
    "./components/**/*.{html,js,jsx,css}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#059212",
        yellowColor: "#06D001",
        purpleColor: "#9BEC00",
        irisBlueColor: "#9BEC00",
        headingColor: "#181A1E",
        textColor: "#4E545F",
      },
      boxShadow: {
        panelShadow: "rgba(17,12,46,0.15) 0px 48px 100px 0px",
      },
    },
  },
  plugins: [],
};
