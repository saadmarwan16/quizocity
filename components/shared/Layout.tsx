import Head from "next/head";
import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
    pageName: string;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, pageName }) => {
  return (
    <>
      <Head>
        <title>{pageName} | Quizocity</title>
        <meta name="description" content="Customized Word Association Quiz For Learning English" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen text-text-primary">
        <Navbar />

        <div className="flex flex-grow p-2 sm:p-6 bg-background md:mt-0 mt-14 md:p-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
