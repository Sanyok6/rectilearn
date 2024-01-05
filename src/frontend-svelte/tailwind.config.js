import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: "class",
  plugins: [],

  theme: {
    extend: {
      fontFamily: {
        ...fontFamily,
        "pacifico": ["Pacifico", "sans-serif"]
      }
    }
  },
};
