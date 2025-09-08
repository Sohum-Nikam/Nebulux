/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderColor: {
        'border': 'hsl(var(--border))',
      },
      outlineColor: {
        'ring': 'hsl(var(--ring))',
      },
      backgroundColor: {
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'card': 'hsl(var(--card))',
        'popover': 'hsl(var(--popover))',
        'primary': 'hsl(var(--primary))',
        'secondary': 'hsl(var(--secondary))',
        'muted': 'hsl(var(--muted))',
        'accent': 'hsl(var(--accent))',
        'destructive': 'hsl(var(--destructive))',
      },
      textColor: {
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'card': 'hsl(var(--card-foreground))',
        'popover': 'hsl(var(--popover-foreground))',
        'primary': 'hsl(var(--primary-foreground))',
        'secondary': 'hsl(var(--secondary-foreground))',
        'muted': 'hsl(var(--muted-foreground))',
        'accent': 'hsl(var(--accent-foreground))',
        'destructive': 'hsl(var(--destructive-foreground))',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};