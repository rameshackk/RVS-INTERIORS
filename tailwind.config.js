/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#181E29',     // Rich architectural dark slate/black
          dark: '#0F131A',        // Deep obsidian background
          surface: '#1E2532',     // Elevated card background
          accent: '#C59A5A',      // Livspace-style warm gold / champagne brass
          accentHover: '#B08544', // Darker gold for hovers
          accentLight: '#F5EBDD', // Very soft warm champagne tone
          subtle: '#2A3445',      // Card borders / dividers in dark mode
          light: '#FAF8F5',       // Warm luxury ivory/cream background
          lightCard: '#FFFFFF',   // Pure crisp white card
          lightBorder: '#EAE5DC', // Subtle ivory border
          crimson: '#E11D48',     // Accent vibrant for hot deals
          emerald: '#10B981',     // Success & guarantees
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(197, 154, 90, 0.35)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 22px 45px -10px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DFBE88 0%, #C59A5A 50%, #9F7334 100%)',
        'dark-gradient': 'linear-gradient(180deg, #181E29 0%, #0F131A 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
