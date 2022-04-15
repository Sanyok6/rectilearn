import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Dashboard/SideBar";
// import CardStack from "../components/Dashboard/CardStack";
import { useState } from "react";
// import GameCardStack from "../components/Dashboard/GameCardStack";
import DashboardSettingsCtx from "../lib/dashboardSettings";
import { useLocalStorage } from "../utils/localStorage";
import dynamic from "next/dynamic";

export type SectionType = 'sets' | 'games' | 'explore' | 'sets & games ';

const CardStack = dynamic(() => import("../components/Dashboard/CardStack"));
const GameCardStack = dynamic(() => import("../components/Dashboard/GameCardStack"));

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