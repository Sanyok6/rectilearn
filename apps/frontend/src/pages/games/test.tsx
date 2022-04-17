import { Button, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Unity, { UnityContent } from "react-unity-webgl";

function Test() {
    const [unityContent, setUnityContent] = useState<UnityContent>();
    useEffect(() => {
        const ctx = new UnityContent("https://free-cdn.pages.dev/Bush-Game2.json", "https://free-cdn.pages.dev/UnityLoader.js");
        ctx.setFullscreen(true);
        setUnityContent(ctx);
    }, []);
    function addEnergy() {
        unityContent?.send("Player", "AddEnergy", -10.00);
    }
    function AnswerQuestion(){
        unityContent?.send("GameManager", "EnablePlayerScript");
    }
    return (
        <>
            <Button onClick={addEnergy}>Energy</Button>
            <Button onClick={AnswerQuestion}>Answer</Button>
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