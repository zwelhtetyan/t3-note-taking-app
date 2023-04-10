import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto_fill_250: "repeat(auto-fill, minmax(350px, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
