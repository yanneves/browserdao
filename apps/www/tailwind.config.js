import icons from "./tailwind.icons.js";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [icons],
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        blaze: {
          50: "hsl(var(--color-blaze-50))",
          100: "hsl(var(--color-blaze-100))",
          200: "hsl(var(--color-blaze-200))",
          300: "hsl(var(--color-blaze-300))",
          400: "hsl(var(--color-blaze-400))",
          500: "hsl(var(--color-blaze-500))",
          600: "hsl(var(--color-blaze-600))",
          700: "hsl(var(--color-blaze-700))",
          800: "hsl(var(--color-blaze-800))",
          900: "hsl(var(--color-blaze-900))",
          950: "hsl(var(--color-blaze-950))",
        },
      },
    },
  },
};
