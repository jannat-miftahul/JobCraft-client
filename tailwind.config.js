/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Primary Colors
                primaryDark: "#1D3557", // Navy Blue
                primaryLight: "#457B9D", // Steel Blue
                secondary: "#F1FAEE", // Soft Mint
                accent: "#E63946", // Crimson Red
                background: "#FAFAFA", // Soft White

                // Extended Palette
                coral: "#FF6B6B", // Coral Pink
                teal: "#4ECDC4", // Teal
                purple: "#6C5CE7", // Purple
                gold: "#F4A261", // Gold/Amber
                emerald: "#2D9B83", // Emerald Green
                slate: "#64748B", // Slate Gray
                rose: "#FB7185", // Rose Pink
                indigo: "#5C6BC0", // Indigo
                amber: "#FBBF24", // Amber
                cyan: "#22D3EE", // Cyan
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "slide-up": "slideUp 0.6s ease-out forwards",
                "pulse-soft": "pulseSoft 2s ease-in-out infinite",
                float: "float 6s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(40px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                pulseSoft: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.7" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
        },
    },
    plugins: [require("daisyui")],
};
