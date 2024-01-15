import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        U1: "#f31e26",
        U2: "#985c9e",
        U3: "#f9762b",
        U4: "#009a4b",
        U5: "#00ddff",
        U6: "#905f36",
        ptBusCity: "#111199",
        ptTram: "#f31e26",
        ptTramWLB: "#f31e26",
      },
    },
  },
  plugins: [],
} satisfies Config;
