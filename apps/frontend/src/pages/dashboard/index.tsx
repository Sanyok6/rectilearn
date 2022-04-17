import { Heading } from "@chakra-ui/react";
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Sidebar from "../../components/Dashboard/SideBar";
import { useContext, useEffect, useState } from "react";
import DashboardCtx from "../../lib/dashboard";
import { useLocalStorage } from "../../utils/localStorage";
import dynamic from "next/dynamic";
import useSWR from 'swr';
import AuthCtx from "../../lib/auth";
import { useRouter } from "next/router";

export type SectionType = 'sets' | 'games' | 'explore' | 'sets & games ';

const CardStack = dynamic(() => import("../../components/Dashboard/CardStack"));
const GameCardStack = dynamic(() => import("../../components/Dashboard/GameCardStack"));
const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: token
    }
  });
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error;
  }
  return res.json()
}

const Dashboard: NextPage = ({ access_token }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [curSection, setCurSection] = useState<SectionType>('sets');
  const [groupGS, setGroupGS] = useLocalStorage<boolean>("prefGS", false);
  const [user, setUser] = useState<{
    name: string,
    email: string,
    role: string
  }>({
    name: "",
    email: "",
    role: "",
  });
  const Router = useRouter();
  const { accessToken, setAccessToken } = useContext(AuthCtx);
  const guest: boolean = access_token === "guest";
  const { data, error }: any = useSWR("/api/auth/users/me/", (url) => guest ? { name: "guest", email: "guest@guest", role: "guest" } : fetcher(url, access_token));
  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (error && error.info && error.info.detail === 'Could not validate credentials') {
      setAccessToken("");
      Router.push("/api/logout");
    } else if (error) {
      console.error(error.info);
      alert(error);
    }
  }, [data, error]);
  useEffect(() => {
    if (accessToken !== access_token) {
      setAccessToken(access_token);
    }
  }, []);
  const defaultDashboardCtx = {
    groupGS,
    setGroupGS,
    user
  };
  return (
    <DashboardCtx.Provider value={defaultDashboardCtx}>
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
    </DashboardCtx.Provider>
  );
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      access_token: ctx.req.cookies.Authorization || null
    }
  }
}