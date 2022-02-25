module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                text: {
                    primary: "#fff",
                    secondary: "#ffffffb3",
                    disabled: "#ffffff80",
                },
                background: {
                    DEFAULT: "#070707",
                    paper: "#101010",
                }
            },
        },
    },
    plugins: [],
};