import { Button, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Unity, { UnityContent } from "react-unity-webgl";

function Test() {
    const [unityContent, setUnityContent] = useState<UnityContent>();
    useEffect(() => {
        const ctx = new UnityContent("https://free-cdn.pages.dev/WebGL-Builds.json", "https://free-cdn.pages.dev/UnityLoader.js");
        ctx.setFullscreen(true);
        setUnityContent(ctx);
    }, []);
    function addEnergy() {
        unityContent?.send("Player", "AddEnergy", -10.00);
    }
    return (
        <>
            <Button onClick={addEnergy}>Energy</Button>
            {
                unityContent ?
                    <Unity
                        unityContent={unityContent}
                    />
                :
                    <Center>{"Loading game... Please wait"}</Center>
            }
        </>
    );
}

export default Test;