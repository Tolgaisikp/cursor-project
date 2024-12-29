import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            'h1': {
              fontSize: '2.5rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              fontWeight: '700',
            },
            'h2': {
              fontSize: '2rem',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
              fontWeight: '600',
            },
            'h3': {
              fontSize: '1.75rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              fontWeight: '600',
            },
            'p': {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              lineHeight: '1.75',
            },
            'ul': {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            'li': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'code': {
              color: '#1a1a1a',
              backgroundColor: '#f5f5f5',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'pre': {
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
            'blockquote': {
              borderLeftWidth: '4px',
              borderLeftColor: '#e5e7eb',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              color: '#4b5563',
            },
            'a': {
              color: '#2563eb',
              textDecoration: 'underline',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
