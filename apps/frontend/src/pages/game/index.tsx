import { KaboomCtx } from "kaboom";
import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

const mapLayout =
`
|||||||||||||||||
|               |
|               |
|               |
|               |
|               |
|               |
|               |
|               |
|               |
|||||||||||||||||`.split("\n");
mapLayout.shift();

async function game(beforeStart: any, SPEED: any, player: any, wallXY: any) {
    console.log(mapLayout);
    console.log(width(), height());
    player.onUpdate(() => {
        camPos(player.pos);
    });
    onKeyDown("left", () => {
        player.flipX(true);
        player.move(-SPEED, 0);
    });
    onKeyDown("right", () => {
        player.flipX(false);
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
        text("Press arrow keys", { width: wallXY * 10 }),
        pos(12, 12),
    ]);
}

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
            const kab = mod.default({ canvas: cRef.current || undefined });
            setK(kab);
            let start = false;
            const SPEED = 320;
            let player: any;
            onTouchEnd(async () => {
                if (!start) {
                    start = true;
                    await loadSprite("bean", "/sprites/bean.png");
                    await loadSprite("wall", "/sprites/wall.jpeg");
                    const itemXLen = mapLayout[0].length;
                    const itemYLen = mapLayout.length;
                    const wallXY = Math.max(width() / itemXLen, height() / itemYLen)
                    const mapObj = addLevel(mapLayout, {
                        width: wallXY,
                        height: wallXY,
                        "|": () => [
                            sprite("wall", {
                                width: wallXY,
                                height: wallXY
                            }),
                            area(),
                            solid()
                        ],
                    });
                    player = add([
                        sprite("bean", {
                            width: wallXY,
                        }),
                        pos(mapObj.getPos(itemXLen / 2, itemYLen / 2)),
                        area(),
                        solid()
                    ]);
                    await game(beforeStart, SPEED, player, wallXY);
                } else {
                    player.moveTo(mousePos().sub(center()).unit().scale(10))
                }
            })
            onClick(async () => {
                if (!start) {
                    start = true;
                    await loadSprite("bean", "/sprites/bean.png");
                    await loadSprite("wall", "/sprites/wall.jpeg");
                    const itemXLen = mapLayout[0].length;
                    const itemYLen = mapLayout.length;
                    const wallXY = Math.max(width() / itemXLen, height() / itemYLen)
                    const mapObj = addLevel(mapLayout, {
                        width: wallXY,
                        height: wallXY,
                        "|": () => [
                            sprite("wall", {
                                width: wallXY,
                                height: wallXY
                            }),
                            area(),
                            solid()
                        ],
                    });
                    player = add([
                        sprite("bean", {
                            width: wallXY,
                        }),
                        pos(mapObj.getPos(itemXLen / 2, itemYLen / 2)),
                        area(),
                        solid()
                    ]);
                    await game(beforeStart, SPEED, player, wallXY);
                }
            });
            const beforeStart = add([
                text("Click Anywhere To Start", {
                    size: width() / 25
                }),
                pos(center()),
                kab.origin("center"),
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