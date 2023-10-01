"use client";

import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { ReactNode, useContext } from "react";

import "@fontsource/pacifico";
import { Link } from '@chakra-ui/next-js'
import AuthCtx from "@/lib/auth";
import { PathCtx } from "@/utils/useNavigationEvent";

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	const ctx = useContext(AuthCtx);
	const path = useContext(PathCtx);

	return (
		<Box
			bg={useColorModeValue(
				"rgba(0, 0, 0, 0.05)",
				"rgba(30, 30, 30, 0.5)"
			)}
			color={useColorModeValue("gray.700", "gray.200")}
		>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				spacing={4}
				justify={"center"}
				align={"center"}
			>
				<Text fontSize="40" fontFamily={"pacifico"}>
					Rectilearn
				</Text>
				<Stack direction={"row"} spacing={6}>
					{!ctx.loggedIn ? (
						<>
							<Link href={"/login"} onClick={() => path.setPath(true)}>Login</Link>
							<Link href={"/signup"} onClick={() => path.setPath(true)}>Signup</Link>
						</>
					) : (
						<Link href={"/dashboard"} onClick={() => path.setPath(true)}>Dashboard</Link>
					)}
				</Stack>
			</Container>

			<Box
				borderTopWidth={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("transparent", "gray.700")}
			>
				<Container
					as={Stack}
					maxW={"6xl"}
					py={4}
					direction={{ base: "column", md: "row" }}
					spacing={4}
					justify={{ base: "center", md: "space-between" }}
					align={{ base: "center", md: "center" }}
				>
					<Text>
						This project is open-source, check it out on{" "}
						<Link
							href="https://github.com/Sanyok6/TWTcodejam-team-Rectifiers"
							textDecoration={"underline"}
							onClick={() => path.setPath(true)}
							_hover={{ color: "blue.500" }}
						>
							github
						</Link>
					</Text>
					<Stack direction={"row"} spacing={6}>
						<SocialButton
							label={"Github"}
							href={
								"https://github.com/Sanyok6/TWTcodejam-team-Rectifiers"
							}
						>
							<FaGithub />
						</SocialButton>
						<SocialButton label={"Discord"} href={"#"}>
							<FaDiscord />
						</SocialButton>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}
