import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/theme";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AuthCtx from "../lib/auth";

const NextNProgress = dynamic(() => import("nextjs-progressbar"));

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    if (loggedIn === null) {
      fetch("/api/state", {
        method: 'GET'
      }).then((res) => res.json())
        .then((res) => {
          setLoggedIn(res);
        })
        .catch(console.error);
    }
  }, [loggedIn]);
  return (
    <>
      <NextNProgress
        color="#29D"
        startPosition={0.8}
        stopDelayMs={10}
        height={3}
        showOnShallow={true}
        options={{ easing: "ease", speed: 500 }}
      />
      <ChakraProvider theme={theme}>
        <AuthCtx.Provider value={{
          accessToken,
          setAccessToken,
          loggedIn,
          setLoggedIn
        }}>
          <Component {...pageProps} />
        </AuthCtx.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;