import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#00b4b9",
        },
        secondary: {
          main: "#eff8fc",
        },
        success: "#96CC9F",
        danger: "#E45353",
      },
      fontFamily: {
        sans: ["Geist-regular", "sans-serif"],
        "geist-black": ["Geist-Black", "sans-serif"],
        "geist-bold": ["Geist-Bold", "sans-serif"],
        "geist-medium": ["Geist-Medium", "sans-serif"],
        "geist-regular": ["Geist-Regular", "sans-serif"],
        "geist-semibold": ["Geist-SemiBold", "sans-serif"],
      },
      container: {
        center: true, // Optional: Centers the container horizontally
        padding: {
          DEFAULT: "1rem", // This is equivalent to pl-10 pr-10 (40px on both sides)
          md: "2.5rem",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
