// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html","./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          900: "#0b1020", // 심연 남보라
          800: "#141a33",
          700: "#1b2340",
          600: "#223058",
        },
        moon: {
          100: "#e7ecff", // 희끄무레 달빛
          200: "#cfd9ff",
          300: "#b7c4ff",
        },
        stardust: {
          300: "#ffd98a", // 금빛 포인트
          400: "#ffca5c",
          500: "#f6b53f",
        },
        ink: {
          300: "#6f78a8",
          400: "#5a628f",
          500: "#464c73",
        }
      },
      boxShadow: {
        moon: "0 10px 30px rgba(30,40,80,.35), inset 0 1px 0 rgba(255,255,255,.06)",
        glass: "0 8px 24px rgba(0,0,0,.35)",
      },
      backdropBlur: { xs: "2px" },
      animation: {
        twinkle: "twinkle 2.8s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: .4, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.15)" }
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        }
      }
    }
  },
  plugins: [],
} satisfies Config;
