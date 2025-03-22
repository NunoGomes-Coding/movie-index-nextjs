import type { Config } from "tailwindcss";
import TailwindAnimate from "tailwindcss-animate";
import VidstackTailwind from "@vidstack/react/tailwind.cjs";

// import plugin from 'tailwindcss/plugin';

// const radialGradientPlugin = plugin(
//   function ({ matchUtilities, theme }) {
//     matchUtilities(
//       {
//         // map to bg-gradient-[*]
//         'bg-gradient': value => ({
//           'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`,
//         }),
//       },
//       { values: theme('radialGradients') }
//     )
//   },
//   {
//     theme: {
//       radialGradients: _presets(),
//     },
//   }
// )

// /**
//  * utility class presets
//  */
// function _presets() {
//   const shapes = ['circle', 'ellipse'] as const;
//   const pos = {
//     c: 'center',
//     t: 'top',
//     b: 'bottom',
//     l: 'left',
//     r: 'right',
//     tl: 'top left',
//     tr: 'top right',
//     bl: 'bottom left',
//     br: 'bottom right',
//   } as const;

//   type resultType = Record<`${typeof shapes[number]}-${keyof typeof pos}`, string>
//   const result: resultType = {} as resultType;

//   for (const shape of shapes)
//     for (const [posName, posValue] of Object.entries(pos))
//       result[`${shape}-${posName}` as `${typeof shapes[number]}-${keyof typeof pos}`] = `${shape} at ${posValue}`;

//   return result;
// }

export default {
  // mode: "jit",
  // darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: [
      //     "Inter",
      //     "ui-sans-serif",
      //     "system-ui",
      //     "sans-serif",
      //     "Apple Color Emoji",
      //     "Segoe UI Emoji",
      //     "Segoe UI Symbol",
      //     "Noto Color Emoji",
      //   ],
      // },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "fade-out": "fadeIn 1s ease-in-out",
        "progress-thumb": "progress 4s linear forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spinner-leaf-fade": "spinner-leaf-fade 0.8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        progress: {
          "0%": {
            width: "5%",
          },
          "90%": {
            width: "100%",
          },
          "100%": {
            width: "100%",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "spinner-leaf-fade": {
          "0%, 100%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
    },
  },
  // // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [TailwindAnimate, VidstackTailwind /*radialGradientPlugin*/],
} satisfies Config;
