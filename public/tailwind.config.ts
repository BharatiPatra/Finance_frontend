import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import shadcnPreset from 'tailwindcss-preset-shadcn'

const { fontFamily } = defaultTheme

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  presets: [shadcnPreset()],
  plugins: [],
}

export default config
