import { Heading } from "@chakra-ui/react";
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Sidebar from "../../components/Dashboard/SideBar";
import { useState } from "react";
import DashboardSettingsCtx from "../../lib/dashboardSettings";
import { useLocalStorage } from "../../utils/localStorage";
import dynamic from "next/dynamic";
import useSWR from 'swr';

export type SectionType = 'sets' | 'games' | 'explore' | 'sets & games ';

const CardStack = dynamic(() => import("../../components/Dashboard/CardStack"));
const GameCardStack = dynamic(() => import("../../components/Dashboard/GameCardStack"));
const fetcher = (url: string, token: string) => fetch(url, {
  headers: {
    Authorization: "Bearer " + token
  }
}).then(r => r.json())

const Dashboard: NextPage = ({ access_token }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [curSection, setCurSection] = useState<SectionType>('sets');
  const [groupGS, setGroupGS] = useLocalStorage<boolean>("prefGS", false);
  const defaultDashboardSettings = {
    groupGS,
    setGroupGS
  };
  const { data } = useSWR("/api/auth/users/me", (url) => access_token === "guest" ? {} : fetcher(url, access_token));
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      access_token: context.req.cookies.access_token || null
    }
  }
}