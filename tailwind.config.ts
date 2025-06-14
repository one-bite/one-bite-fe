import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        "text-gray-800",
        "text-amber-700",
        "text-gray-500",
        "text-gray-300",
        "text-yellow-500",
        "text-teal-400",
        "text-cyan-400",
        "bg-gray-800",
        "bg-amber-700",
        "bg-gray-500",
        "bg-gray-300",
        "bg-yellow-500",
        "bg-teal-400",
        "bg-cyan-400",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#30A46C",
                secondary: "#8ECEAA",
                violet: "#7c3aed",
            },
            fontFamily: {
                line: ['LINESeedKR-Rg', 'sans-serif'],
                linebold: ['LINESeedKR-B', 'sans-serif'],
                jungM : ['Jungnajoch-M' , 'sans-serif']
            },
            keyframes: {
                "spin-burst-6" : {
                    "0%": { transform: "rotate(0deg)" },
                    "15%": {transform: "rotate(360deg)" },
                    "100%": {transform: "rotate(360deg)" },
                },
            },
            animation: {
              "spin-burst-6" : "spin-burst-6 6s linear infinite",
            },
        },
    },
    plugins: [
        nextui(),
        typography
    ],
} as Config;

// nextui({
//   prefix: "nextui",
//   addCommonColors: true,
//   defaultTheme: "light", // default theme from the themes object
//   defaultExtendTheme: "light", // default theme to extend on custom themes
//   layout: {
//     dividerWeight: "1px", // h-divider the default height applied to the divider component
//     disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
//     fontSize: {
//       tiny: "0.75rem", // text-tiny
//       small: "0.875rem", // text-small
//       medium: "1rem", // text-medium
//       large: "1.125rem", // text-large
//     },
//     lineHeight: {
//       tiny: "1rem", // text-tiny
//       small: "1.25rem", // text-small
//       medium: "1.5rem", // text-medium
//       large: "1.75rem", // text-large
//     },
//     radius: {
//       small: "8px", // rounded-small
//       medium: "12px", // rounded-medium
//       large: "14px", // rounded-large
//     },
//     borderWidth: {
//       small: "1px", // border-small
//       medium: "2px", // border-medium (default)
//       large: "3px", // border-large
//     },
//   }, // common layout tokens (applied to all themes)
//   themes: {
//     light: {
//       layout: {}, // light theme layout tokens
//       colors: {}, // light theme colors
//     },
//     dark: {
//       layout: {}, // dark theme layout tokens
//       colors: {}, // dark theme colors
//     },
//   },
// })
