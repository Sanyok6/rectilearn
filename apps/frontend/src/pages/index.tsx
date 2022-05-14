import { NextPage } from "next";
import Head from "next/head";

import WelcomePage from "../components/Home/welcome";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page</title>
      </Head>
      <WelcomePage />
    </>
  );
}

export default Index;