import "./globals.css";
import { ColorModeScript } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NextNProgress from "@/components/Progress";
import { config } from "@/lib/theme";
import { cookies, headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Rectilearn",
	description: "Insert creative description here",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const headersList = headers();
  const thm = (cookieStore.get("chakra-ui-color-mode")?.value as "light" | "dark" | "system" | undefined) || config.initialColorMode;
	return (
		<html lang="en">
			<body className={inter.className}>
        <ColorModeScript initialColorMode={thm} type="cookie" />
        <NextNProgress
          color="#29D"
          startPosition={0.8}
          stopDelayMs={10}
          height={3}
          showOnShallow={true}
          options={{ easing: "ease", speed: 500 }}
        />
				<Providers cookies={headersList.get("cookie") ?? ""}>{children}</Providers>
			</body>
		</html>
	);
}
