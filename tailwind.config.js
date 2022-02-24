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
                    DEFAULT: "#929EAF",
                    paper: "#04050D",
                }
            },
        },
    },
    plugins: [],
};