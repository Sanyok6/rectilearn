"use client";

import AuthCtx from "@/lib/auth";
import DashboardCtx from "@/lib/dashboard";
import { SectionType } from "@/lib/types";
import { useLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import Sidebar from "./SideBar";
import { Heading, Text } from "@chakra-ui/react";
import CardStack from "./CardStack";
import GameCardStack from "./GameCardStack";
import { Link } from "@chakra-ui/next-js";
import { PathCtx } from "@/utils/useNavigationEvent";

const fetcher = async (url: string, token: string) => {
	const res = await fetch(url, {
		headers: {
			Authorization: token,
		},
	});
	if (!res.ok) {
		const error: any = new Error("An error occurred while fetching the data.");
		// Attach extra info to the error object.
		error.info = await res.json();
		error.status = res.status;
		throw error;
	}
	return res.json();
};

const Dashboard = ({ children, access_token }: { children: React.ReactNode, access_token: string }) => {
    const [curSection, setCurSection] = useState<SectionType>("sets");
	const [groupGS, setGroupGS] = useLocalStorage<boolean>("prefGS", false);
	const [user, setUser] = useState<{
		name: string;
		email: string;
		role: string;
        profile_picture_index: number;
	}>({
		name: "",
		email: "",
		role: "",
        profile_picture_index: 0
	});
	const Router = useRouter();
	const { accessToken, setAccessToken } = useContext(AuthCtx);
	const path = useContext(PathCtx);
	const guest: boolean = access_token === "guest";
	const { data, error }: any = useSWR("/api/auth/users/me/", (url) =>
		guest ? { name: "guest", email: "guest@guest", role: "guest" } : fetcher(url, access_token)
	);
	useEffect(() => {
		if (data) {
			setUser(data);
		}
		if (error && error.info && error.info.detail === "Could not validate credentials") {
			setAccessToken("");
			path.setPath(true);
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
		user,
	};
    return (
        <DashboardCtx.Provider value={defaultDashboardCtx}>
            {children}
            <Sidebar alterSection={setCurSection}>
				<Heading as="h1" textAlign={"center"}>
					Welcome to the dashboard!
				</Heading>
				{!groupGS ? (
					curSection === "sets" ? (
						<CardStack />
					) : curSection === "games" ? (
						<GameCardStack />
					) : (
						//  explore
						<>
							<Text marginTop={"10"} size="xl">
								Choose a study set from{" "}
								<Link color="blue.400" href="https://quizlet.com/search">
									Quizlet
								</Link>{" "}
								and import it!
							</Text>
						</>
					)
				) : curSection === "explore" ? (
					<></>
				) : (
					// sets & games
					<>
						<CardStack />
						<GameCardStack />
					</>
				)}
			</Sidebar>
        </DashboardCtx.Provider>
    )
}

export default Dashboard;