import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: purple,
    text: {
      primary: "#fff",
      secondary: "#ffffffb3",
      disabled: "#ffffff80",
    },
    divider: "#ffffff1f",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
