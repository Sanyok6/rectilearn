import Head from "next/head";
import { NextPage } from "next";

import Questions from "./questions";

const Index: NextPage = () => {
    return (
      <>
        <Head>
          <title>Games</title>
        </Head>
        <Questions />
      </>
    );
  }
  
export default Index;