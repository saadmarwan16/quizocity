import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, teal } from "@mui/material/colors";
import Head from "next/head";
import Navbar from "../components/shared/Navbar";
import { AuthContext } from "../lib/data/providers";
import useUserData from "../lib/data/hooks/useUserData";

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
  const { user, loading, error } = useUserData();

  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>Home | Quizocity</title>
          <meta name="description" content="Customized Word Association Quiz" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* {loading && (
          <div className="flex flex-col min-h-screen text-background">
            Loading
          </div>
        )}

        {error && (
          <div className="flex flex-col min-h-screen text-background">
            Error: {error.message}
          </div>
        )} */}

        {user ? (
          <AuthContext.Provider value={user}>
            <div className="flex flex-col min-h-screen text-text-primary">
              <Navbar />

              <div className="flex items-center justify-center flex-grow p-0 bg-background md:mt-0 mt-14 md:p-10">
                <Component {...pageProps} />
              </div>
            </div>
          </AuthContext.Provider>
        ) : (
          <div className="flex flex-col min-h-screen text-background">
            Error: {user}
          </div>
        )}
      </>
    </ThemeProvider>
  );
}

export default MyApp;
