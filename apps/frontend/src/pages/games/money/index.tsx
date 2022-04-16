import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import Questions from "../../../components/questions";

const mapLayout =
`
|||||||||||||||||
|               |
|SS             |
|SS             |
|            $  |
|QQ         $$  |
|QQ        $$$$ |
|          $$$$ |
|!         $$$$ |
|           $$  |
|@              |
|||||||||||||||||`.split("\n");
mapLayout.shift();

const Game: NextPage = () => {
    const [open, setOpen] = useState<boolean>(false)

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

            await loadSprite("money", "/sprites/money.png");
            await loadSprite("store", "/sprites/store.png");
            await loadSprite("questions", "/sprites/questions.png");

            await loadSprite("upgradeM", "/sprites/upgradeMoney.png");
            await loadSprite("upgradeS", "/sprites/upgradeSpeed.png");

            let start = false;
            let SPEED = 400;
            let COST = 1
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
                    "S": () => [
                        sprite("store", {
                            width: wallXY,
                            height: wallXY
                        }),
                        area(),
                        solid(),
                        "store"
                    ],
                    "!": () => [
                        sprite("upgradeM", {
                            width: wallXY,
                            height: wallXY
                        }),
                        area(),
                        solid(),
                        "upgradeM"
                    ],
                    "@": () => [
                        sprite("upgradeS", {
                            width: wallXY,
                            height: wallXY
                        }),
                        area(),
                        solid(),
                        "upgradeS"
                    ],
                    "Q": () => [
                        sprite("questions", {
                            width: wallXY,
                            height: wallXY
                        }),
                        area(),
                        solid(),
                        "questions"
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
                const cash = add([
                    text("Cash: 0"),
                    pos(0, 0),
                    fixed(),
                    { value: 0 },
                ])
                const fish = add([
                    text("Fish: 0"),
                        pos(0, 80),
                        fixed(),
                        { value: 0 },
                    ])
                const bait = add([
                text("Bait: 0"),
                    pos(0, 160),
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
                    if (touching && bait.value > 0) {
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
                        bait.value --;
                        bait.text = "Bait: " + bait.value
                        rod.spin();
                        fish.value ++;
                        fish.text = "Fish: " + fish.value
                    }

                    touching=false

                    every("store", (s) => {
                        if (player.isTouching(s))
                        touching = true;
                    });
                    if (touching && fish.value>0) {
                        const dollar = add([
                            sprite("money", {
                                width: wallXY
                            }),
                            pos(player.pos)
                        ]);
                        dollar.onUpdate(() => {
                            dollar.moveTo(dollar.pos.x+1, dollar.pos.y-10)
                        })
                        wait(2, () => {
                            destroy(dollar);
                        });
                        fish.value --;
                        fish.text = "Fish: " + fish.value;
                        cash.value += COST;
                        cash.text = "Cash: " + cash.value;
                    }

                    touching=false

                    every("questions", (s) => {
                        if (player.isTouching(s))
                        touching = true;
                    });
                    if (touching) {

                        setOpen(true)

                        bait.value ++;
                        bait.text = "Bait: " + bait.value;
                    }

                    touching=false

                    every("upgradeM", (s) => {
                        if (player.isTouching(s))
                        touching = true;
                    });
                    if (touching) {

                        if (cash.value >= COST*5) {
                            cash.value -= COST*5 
                            cash.text = "Cash: " + cash.value;
                            console.log(COST)
                            COST += COST;
                            console.log(COST)
                         } else {
                             alert("you need $"+COST*5+" for that!")
                         }
                    }

                    touching=false

                    every("upgradeS", (s) => {
                        if (player.isTouching(s))
                        touching = true;
                    });
                    if (touching) {

                        if (cash.value >= SPEED/20) {
                           cash.value -= SPEED/20 
                           cash.text = "Cash: " + cash.value;
                           SPEED += 200;
                        } else {
                            alert("you need $"+SPEED/20+" for that!")
                        }
                    }

                    touching=false
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
            <Questions question="t" answer="t" open={open} isOpen={setOpen} />
        </>
    )
}

export default Game;