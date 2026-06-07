/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./**/*.{html,js,md}"],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}