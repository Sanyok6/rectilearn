import { Heading } from "@chakra-ui/react";
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Sidebar from "../../components/Dashboard/SideBar";
import { useContext, useState } from "react";
import DashboardSettingsCtx from "../../lib/dashboardSettings";
import { useLocalStorage } from "../../utils/localStorage";
import dynamic from "next/dynamic";
import useSWR from 'swr';
import AuthCtx from "../../lib/auth";

export type SectionType = 'sets' | 'games' | 'explore' | 'sets & games ';

const CardStack = dynamic(() => import("../../components/Dashboard/CardStack"));
const GameCardStack = dynamic(() => import("../../components/Dashboard/GameCardStack"));
const fetcher = (url: string, token: string) => fetch(url, {
  headers: {
    Authorization: token
  }
}).then(r => r.json())

const Dashboard: NextPage = () => {
  const [curSection, setCurSection] = useState<SectionType>('sets');
  const [groupGS, setGroupGS] = useLocalStorage<boolean>("prefGS", false);
  const { accessToken } = useContext(AuthCtx);
  const defaultDashboardSettings = {
    groupGS,
    setGroupGS
  };
  const { data } = useSWR("/api/auth/users/me", (url) => accessToken === "guest" ? {} : fetcher(url, accessToken));
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

