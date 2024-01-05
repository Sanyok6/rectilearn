import { useThree } from "@react-three/fiber";
import { useEffect, useId } from "react";
import { createRoot } from "react-dom/client";

export default function Root({
    children
}: {
    children: React.ReactNode
}) {
    const { gl } = useThree();

    const domElement = gl.domElement;

    const id = useId();

    useEffect(() => {
        // const id = Math.floor(Math.random() * 10000000) + "";
        if (domElement && id) {
            // let root = document.getElementById("__GAME_ROOT");
            // if (!root) {
            const root = document.createElement("div");
            root.id = id;
            root.style.width = "100%";
            root.style.height = "100%";
            root.style.display = "flex";
            root.style.flexDirection = "column";
            root.style.alignItems = "center";
            root.style.justifyContent = "center";
            domElement.parentElement!.append(root);
            // }
            const reactRoot = createRoot(root);
            reactRoot.render(children);
        }

        return () => {
            const el = document.getElementById(id);
            el?.parentElement?.removeChild(el);
        }
    }, [domElement, children, id]);
    return <></>
}