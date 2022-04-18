import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AuthCtx from "../../lib/auth";

const Games: NextPage = () => {
    const { gameSession } = useContext(AuthCtx);
    const Router = useRouter();
    useEffect(() => {
        if (!gameSession) {
            Router.push("/dashboard");
            return;
        }
        switch (gameSession.game) {
            case "lavaGame":
                
                break;
            case "":
                break;
        }
    }, []);
    return (
        <>
        </>
    )
}

export default Games;