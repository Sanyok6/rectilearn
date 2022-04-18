import { Button, Center, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import { StudySet } from "../Dashboard/Card";
import Questions from "../questions";

function BushGame({ studySet }: { studySet: StudySet }) {
    const [unityContent, setUnityContent] = useState<UnityContent>();
    const [open, setOpen] = useState<boolean>(false);
    const toast = useToast();
    useEffect(() => {
        const ctx = new UnityContent("https://free-cdn.pages.dev/WebGL-Builds.json", "https://free-cdn.pages.dev/UnityLoader.js");
        ctx.setFullscreen(true);
        setUnityContent(ctx);
    }, []);
    function addEnergy() {
        unityContent?.send("Player", "AddEnergy", 10.00);
        toast({
            title: 'Note:',
            description: "This game is in Unity, thus questions will not work as Unity hijacks all the keyboard inputs.",
            status: 'warning',
            duration: 3000,
            isClosable: true,
        });
    }
    return (
        <>
            
            {
                unityContent ?
                    <>
                        <Button onClick={addEnergy}>Get more running energy</Button>
                        <Unity
                            unityContent={unityContent}
                        />
                    </>
                :
                    <Center>{"Loading game... Please wait"}</Center>
            }
            <Questions
				questions={studySet.questions}
				open={open}
				isOpen={setOpen}
			/>
        </>
    );
}

export default BushGame;