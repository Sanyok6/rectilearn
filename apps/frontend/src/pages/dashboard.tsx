import { Heading, useColorMode, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Cards from "../components/_Cards";
import Card from "../components/_Card";
import Sidebar from "../components/SideBar";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Sidebar>
        <Heading as="h1" textAlign={"center"}>
          Welcome to the dashboard!
        </Heading>
        <Cards>
          <Card title={"study set title"}></Card>
        </Cards>
      </Sidebar>
    </>
  );
}

export default Dashboard;