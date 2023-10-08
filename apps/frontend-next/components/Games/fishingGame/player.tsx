import { PointerLockControls } from "@react-three/drei";
import { useState } from "react";

export default function Player() {
    const [isPLOCK, setPLOCK] = useState<boolean>(false);
    return (
        <>
            <perspectiveCamera fov={120}>
                {isPLOCK ? (
                    <PointerLockControls />
                ): (
                    // <Controller />
                    <></>
                )}
            </perspectiveCamera>
        </>
    )
}