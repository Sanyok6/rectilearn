import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/theme";
import dynamic from "next/dynamic";

const NextNProgress = dynamic(() => import("nextjs-progressbar"));

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
