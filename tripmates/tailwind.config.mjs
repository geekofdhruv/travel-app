/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        '3xl': '1.5rem',  // Default value for 'rounded-3xl', adjust if needed
        '4xl': '2rem',    // Custom border radius for 'rounded-4xl'
        '5xl': '6rem',  // Custom border radius for 'rounded-5xl'
        // You can add more custom values here if needed
      },
    },
  },
  plugins: [],
};
