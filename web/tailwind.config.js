module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
		colors: {
			brand: {
				hover: '#9960ff',
				500: '#8257e6',
			},  
		},
		borderRadius: {
			md: '4px'
		}
		
	},
  },
  plugins: [
	  require('@tailwindcss/forms'),
	  require('tailwind-scrollbar')
  ],
}
