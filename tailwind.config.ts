import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        "panel-2": "var(--panel-2)",
        seam: "var(--seam)",
        "seam-bright": "var(--seam-bright)",
        ink: "var(--ink)",
        "ink-dim": "var(--ink-dim)",
        "ink-faint": "var(--ink-faint)",
        amber: "var(--amber)",
        "amber-soft": "var(--amber-soft)",
        pass: "var(--pass)",
        fail: "var(--fail)",
      },
      fontFamily: {
        human: ['"Hanken Grotesk Variable"', "system-ui", "sans-serif"],
        mono: ['"Martian Mono Variable"', "ui-monospace", "monospace"],
        code: ['"Geist Mono Variable"', "ui-monospace", "monospace"],
      },
      fontSize: {
        display: "var(--step-display)",
        gauge: "var(--step-gauge)",
        h2: "var(--step-h2)",
        h3: "var(--step-h3)",
        body: "var(--step-body)",
        data: "var(--step-data)",
        label: "var(--step-label)",
      },
      letterSpacing: {
        data: "0.04em",
        labeltrack: "0.12em",
      },
      maxWidth: {
        frame: "1200px",
        prose: "68ch",
      },
      borderColor: {
        DEFAULT: "var(--seam)",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.30, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
