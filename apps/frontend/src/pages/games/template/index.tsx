import Head from "next/head";
import { NextPage } from "next";

import Questions from "../../../components/questions";

import { useState } from "react";

import { Button } from "@chakra-ui/react";

const Template: NextPage = () => {
    const [open, isOpen] = useState<boolean>(true)

    return (
      <>
        <Head>
          <title>Games</title>
        </Head>
        <Button onClick={() => {isOpen(true)}}></Button>
        <Questions question="hello in french" answer="bonjour" open={open} isOpen={isOpen} />
      </>
    );
  }
  
export default Template;