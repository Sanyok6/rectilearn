import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/SideBar";
import CardStack from "../components/CardStack";
import { useState } from "react";
import GameCardStack from "../components/GameCardStack";

export type SectionType = 'sets' | 'games' | 'explore';

const Dashboard: NextPage = () => {
  const [curSection, setCurSection] = useState<SectionType>('sets');
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Sidebar alterSection={setCurSection}>
        <Heading as="h1" textAlign={"center"}>
          Welcome to the dashboard!
        </Heading>
        {
          curSection === 'sets' ? 
            <CardStack />
          : curSection === 'games' ?
            <GameCardStack />
          : //  explore
            <></>
        }
      </Sidebar>
    </>
  );
}

export default Dashboard;