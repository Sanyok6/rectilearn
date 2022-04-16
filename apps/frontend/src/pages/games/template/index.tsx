import Head from "next/head";
import { NextPage } from "next";

import Questions from "../../../components/questions";

import { useState } from "react";

const Template: NextPage = () => {
    const [open, isOpen] = useState<boolean>(true)

    return (
      <>
        <Head>
          <title>Games</title>
        </Head>
        <Questions question="hello in french" answer="bonjour" open={open} />
      </>
    );
  }
  
export default Template;