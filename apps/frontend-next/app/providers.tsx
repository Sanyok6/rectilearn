"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, cookieStorageManagerSSR } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import theme from "@/lib/theme";
import AuthCtx, { type IgameSession } from "@/lib/auth";
import { PathCtx } from "@/utils/useNavigationEvent";

export function Providers({ children, cookies }: { children: React.ReactNode, cookies: string }) {
    const [accessToken, setAccessToken] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [gameSession, setGameSession] = useState<IgameSession>();
    const [path, setPath] = useState<boolean>(false);
    useEffect(() => {
        if (loggedIn === null) {
        fetch("/api/state/", {
            method: 'GET'
        }).then((res) => res.json())
            .then((res) => {
            setLoggedIn(res);
            })
            .catch(console.error);
        }
    }, [loggedIn]);
	return (
		<CacheProvider>
			<ChakraProvider theme={theme} colorModeManager={cookieStorageManagerSSR(cookies)}>
                <AuthCtx.Provider value={{
                    accessToken,
                    setAccessToken,
                    loggedIn,
                    setLoggedIn,
                    gameSession,
                    setGameSession
                }}>
                    <PathCtx.Provider value={{
                        path,
                        setPath
                    }}>
                        {children}
                    </PathCtx.Provider>
                </AuthCtx.Provider>
            </ChakraProvider>
		</CacheProvider>
	);
}
