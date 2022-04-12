import { KaboomCtx } from "kaboom";
import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

const mapLayout =
`
|                |
|                |
|                |
|                |
|                |`.split("\n");
mapLayout.shift();

const Game: NextPage = () => {
    const [ka, setK] = useState<KaboomCtx>();
    const cRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        (async function () {
            if (cRef.current) {
                cRef.current.style.width = "100vw";
                cRef.current.style.height= "100vh";
                cRef.current.focus();
            }
            const mod = await import("kaboom");
            setK(mod.default({ canvas: cRef.current || undefined }));
            let start = false;
            const SPEED = 320;
            let player: any;
            onClick(async () => {
                if (start) {
                    player.moveTo(mousePos());
                } else {
                    await loadSprite("bean", "/sprites/bean.png");
                    await loadSprite("wall", "/sprites/wall.jpeg");
                    console.log(mapLayout);
                    addLevel(mapLayout, {
                        width: width(),
                        height: height(),
                        "|": () => [
                            sprite("wall", {
                                width: width() / 15,
                                height: height() / 15
                            }),
                            area(),
                            solid()
                        ],
                    });
                    player = add([
                        sprite("bean"),
                        pos(center()),
                        area()
                    ]);
                    onKeyDown("left", () => {
                        player.move(-SPEED, 0);
                    });
                    onKeyDown("right", () => {
                        player.move(SPEED, 0);
                    });
                    onKeyDown("up", () => {
                        player.move(0, -SPEED);
                    });
                    onKeyDown("down", () => {
                        player.move(0, SPEED);
                    });
                    beforeStart.destroy();
                    add([
                        text("Press arrow keys", { width: width() / 2 }),
                        pos(12, 12),
                    ]);
                } 
            });
            const beforeStart = add([
                text("Click Anywhere To Start", {
                    size: width() / 25
                }),
                pos(center()),
                origin("center"),
            ]);
        })()
        return () => ka?.every(destroy);
    }, []);
    return (
        <>
            <canvas ref={cRef}></canvas>
        </>
    )
}

export default Game;