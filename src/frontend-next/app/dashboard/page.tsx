// import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Sidebar from "@/components/Dashboard/SideBar";
import DashboardComponent from "@/components/Dashboard";
// import { useContext, useEffect, useState } from "react";
// import DashboardCtx from "@/lib/dashboard";
// import { useLocalStorage } from "@/utils/localStorage";
import dynamic from "next/dynamic";
// import useSWR from "swr";
// import AuthCtx from "@/lib/auth";
import { redirect, useRouter } from "next/navigation";
import { cookies } from 'next/headers';
import { Heading } from "@chakra-ui/react";

// import { Text, Link } from "@chakra-ui/react";
// import { SectionType } from "@/lib/types";

const CardStack = dynamic(() => import("../../components/Dashboard/CardStack"));
const GameCardStack = dynamic(() => import("../../components/Dashboard/GameCardStack"));
// Dynamically import to reduce bundle size


const Dashboard: NextPage = () => {
    const cookieStore = cookies();
    const access_token = cookieStore.get("Authorization")?.value || null;
    if (!access_token) redirect("/login");
	
	return (
        <DashboardComponent access_token={access_token}>
			<Head>
				<title>Dashboard</title>
			</Head>
        </DashboardComponent>
	);
};

export default Dashboard;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// 	return {
// 		props: {
// 			access_token: ctx.req.cookies.Authorization || null,
// 		},
// 	};
// };
