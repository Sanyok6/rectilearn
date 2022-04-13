import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/SideBar";
import CardStack from "../components/CardStack";
import { useState } from "react";
import GameCardStack from "../components/GameCardStack";
import DashboardSettingsCtx from "../lib/dashboardSettings";
import { useLocalStorage } from "../utils/localStorage";

export type SectionType = 'sets' | 'games' | 'explore' | 'sets & games ';

const Dashboard: NextPage = () => {
  const [curSection, setCurSection] = useState<SectionType>('sets');
  const [groupGS, setGroupGS] = useLocalStorage<boolean>("prefGS", false)
  const defaultDashboardSettings = {
    groupGS,
    setGroupGS
  };
  return (
    <DashboardSettingsCtx.Provider value={defaultDashboardSettings}>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Sidebar alterSection={setCurSection}>
        <Heading as="h1" textAlign={"center"}>
          Welcome to the dashboard!
        </Heading>
        {
          !groupGS ?
            curSection === 'sets' ? 
              <CardStack />
            : curSection === 'games' ?
              <GameCardStack />
            : //  explore
              <></>
          :
            curSection === 'explore' ?
              <></>
            : // sets & games
              <>
                <CardStack />
                <GameCardStack />
              </>
        }
      </Sidebar>
    </DashboardSettingsCtx.Provider>
  );
}

export default Dashboard;