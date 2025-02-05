import type { Config } from "tailwindcss";

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
        "mygreen": "#13C394",
        "mydarkgreen": "#11AB82",
        "mylightgreen": "#CFF9E0",
      },
    },
  },
  plugins: [],
} satisfies Config;
