import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import Questions from "../../../components/questions";

const mapLayout =
`
|||||||||||||||||
|               |
|               |
|               |
|               |
|               |
|          $$$  |
|          $$$  |
|          $$$  |
|               |
|||||||||||||||||`.split("\n");
mapLayout.shift();

const Game: NextPage = () => {
    const cRef = useRef<HTMLCanvasElement>(null);
    const [reload, setReload] = useState<boolean>(false);
    useEffect(() => {
        window.onresize = () => {
            setReload(reload => !reload)
        }
        if (cRef.current) {
            cRef.current.style.width = "100vw";
            cRef.current.style.height= "100vh";
            cRef.current.style.position = "fixed";
            cRef.current.focus();
        }
        async function Launch() {
            const kab = await import("kaboom").then((mod) => mod.default({ canvas: cRef.current || undefined, background: [137, 142, 140], width: cRef.current?.scrollWidth, height: cRef.current?.scrollHeight }));
            await loadSprite("bean", "/sprites/bean.png");
            await loadSprite("wall", "/sprites/wall.jpeg");
            await loadSprite("water", "/sprites/water.jpeg");
            await loadSprite("grass", "/sprites/grass.png");
            await loadSprite("bird", "/sprites/bird.png");
            await loadSprite("bg", "/sprites/grassBg.png");
            await loadSprite("rod", "/sprites/rod.png");
            let start = false;
            const SPEED = 320;
            add([
                sprite("bg", {
                    width: width(),
                    height: height()
                }),
                pos(0, 0),
                fixed()
            ]);
            const beforeStart = add([
                text("Click Anywhere To Start", {
                    size: width() / 25
                }),
                pos(center()),
                kab.origin("center"),
            ]);
            async function startGame() {
                if (start) return;
                start = true;
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
                    "$": () => [
                        sprite("water", {
                            width: wallXY,
                            height: wallXY
                        }),
                        area(),
                        solid(),
                        "water"
                    ],
                    " ": () => [
                        sprite("grass", {
                            width: wallXY,
                            height: wallXY
                        })
                    ]
                });
                const player = add([
                    sprite("bean", {
                        width: wallXY,
                    }),
                    pos(mapObj.getPos(itemXLen / 2, itemYLen / 2)),
                    area(),
                    solid()
                ]);
                const rod = add([
                    sprite("rod", {
                        height: wallXY
                    }),
                    pos(),
                    follow(player, vec2(wallXY * 0.7, -wallXY * 0.3)),
                    rotate(0),
                    spin()
                ]);
                const counter = add([
                    text("Cash: 0"),
                    pos(0, 0),
                    fixed(),
                    { value: 0 },
                ])
                function spin() {
                    let spinning = false
                    return {
                        id: "spin",
                        update() {
                            const t = this as any;
                            if (spinning) {
                                t.angle += 1200 * dt()
                                if (t.angle >= 360) {
                                    t.angle = 0
                                    spinning = false
                                }
                            }
                        },
                        spin() {
                            spinning = true
                        },
                    }
                }
                beforeStart.destroy();
                player.onUpdate(() => {
                    camPos(player.pos);
                });
                onKeyDown("left", () => {
                    player.flipX(true);
                    rod.flipX(true);
                    rod.follow.offset = vec2(-wallXY * 0.7, -wallXY * 0.3);
                    player.move(-SPEED, 0);
                });
                onKeyDown("right", () => {
                    player.flipX(false);
                    rod.flipX(false);
                    rod.follow.offset = vec2(wallXY * 0.7, -wallXY * 0.3)
                    player.move(SPEED, 0);
                });
                onKeyDown("up", () => {
                    player.move(0, -SPEED);
                });
                onKeyDown("down", () => {
                    player.move(0, SPEED);
                });
                onKeyPress("space", () => {
                    let touching = false;
                    every("water", (s) => {
                        if (player.isTouching(s)) {
                            touching = true;
                        }
                    });
                    if (touching) {
                        const bird = add([
                            sprite("bird", {
                                width: wallXY
                            }),
                            pos(player.pos)
                        ]);
                        bird.onUpdate(() => {
                            bird.flipX(Math.random() < 0.5);
                            bird.moveTo(bird.pos.x - rand(-20, 20), bird.pos.y - rand(-20, 20))
                        })
                        wait(2, () => {
                            destroy(bird);
                        });
                        rod.spin();
                        counter.value ++;
                        counter.text = "Cash: " + counter.value
                    }
                });
            }
            onTouchEnd(startGame);
            onClick(startGame);
        }
        Launch();
        return () => every(destroy);
    }, [reload]);
    return (
        <>
            <canvas ref={cRef}></canvas>
            <Questions question="t" answer="t" />
        </>
    )
}

export default Game;