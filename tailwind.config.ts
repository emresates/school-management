/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        primary: {
          DEFAULT: "#363F72",
          100: "#363F72",
        },
      },

      screens: {
        xxs: "325px",
        xs: "450px",

        mobile: "640px",
        // => @media (min-width: 640px) { ... }

        tablet: "768px",
        // => @media (min-width: 768px) { ... }

        desktop: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1440px",
        // => @media (min-width: 1440px) { ... }

        "3xl": "1920px",
      },

      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      fontSize: {
        xl: [
          "20px",
          {
            lineHeight: "30px",
          },
        ],
        lg: [
          "18px",
          {
            lineHeight: "28px",
          },
        ],
        md: [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        sm: [
          "14px",
          {
            lineHeight: "20px",
          },
        ],
        xs: ["12px"],
        xxs: ["10px"],
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
      borderRadius: {
        none: "0",
        xxs: "0.125rem", // 2px
        xs: "0.25rem", // 4px
        DEFAULT: "4px", // 4px
        sm: "0.375rem", // 6px
        md: "0.5rem", // 8px
        lg: "0.625rem", // 10px
        xl: "0.75rem", // 12px
        "2xl": "1rem", // 16px
        "3xl": "1.25rem", // 20px
        "4xl": "1.5rem", // 24px
        full: "9999px",
      },
      spacing: {
        none: "0",
        xxs: "0.125rem", // 2px
        xs: "0.25rem", // 4px
        sm: "0.375rem", // 6px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.25rem", // 20px
        "3xl": "1.5rem", // 24px
        "4xl": "2rem", // 32px
        "5xl": "2.5rem", // 40px
        "6xl": "3rem", // 48px
        "7xl": "4rem", // 64px
        "8xl": "5rem", // 80px
        "9xl": "6rem",
        "10xl": "8rem",
        "11xl": "10rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
