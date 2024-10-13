/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#010A0E",
        secondary: "#f3f2f7",
        orange: "#efb01e",
        purple: "#5908d1",
        blue: "#18167d",
        "dark-gray": "#4b4e53",
      },
    },
  },
  plugins: [],
};
