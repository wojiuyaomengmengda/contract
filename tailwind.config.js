module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    content: [
        // Example content paths...
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
        './packages/**/*.{js,jsx,ts,tsx,vue}',
        '*'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
