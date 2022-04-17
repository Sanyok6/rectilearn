import { Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Unity, { UnityContent } from "react-unity-webgl";

function Test() {
    const [unityContent, setUnityContent] = useState<UnityContent>();
    useEffect(() => {
        const ctx = new UnityContent("/unity/WebGl-Builds.json", "/unity/UnityLoader.js");
        ctx.setFullscreen(true);
        setUnityContent(ctx);
    }, []);
    return (
        <>
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