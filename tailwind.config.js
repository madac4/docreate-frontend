module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],

    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
            },
        },
    },
    plugins: [require('flowbite/plugin'), require('@tailwindcss/forms')],
    variants: {
        extend: {
            backgroundColor: ['dark', 'hover', 'focus'],
            textColor: ['dark', 'hover', 'focus'],
            transitionProperty: ['dark'],
            transitionDuration: ['dark'],
            transitionTimingFunction: ['dark'],
        },
    },
};
