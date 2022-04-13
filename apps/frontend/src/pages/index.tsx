import { NextPage } from "next";
import Head from "next/head";

import WelcomePage from "../components/welcomePage/welcome";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page</title>
      </Head>
        <WelcomePage />
    </>
  );
}

export default Dashboard;