import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, teal } from "@mui/material/colors";
import Head from "next/head";

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: purple,
    divider: "#ffffff1f",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <>
      <Head>
        <title>Home | Quizocity</title>
        <meta name="description" content="Customized Word Association Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center min-h-screen p-0 bg-black md:p-10">
        <div className="flex flex-col justify-center w-full min-h-screen p-8 mx-auto md:w-4/5 bg-background-paper rounded-xl md:min-h-fit">
        <Component {...pageProps} />
        </div>
      </div>
    </>
    </ThemeProvider>
  );
}

export default MyApp;
