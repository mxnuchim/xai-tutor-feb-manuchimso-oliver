import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C5CE7",
        pending: "#6B7280",
        inProgress: "#F59E0B",
        completed: "#10B981",
        launched: "#8B5CF6",
      },
    },
  },
};

export default config;
