import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import Questions from "../questions";

import { useToast } from "@chakra-ui/react";
import { StudySet } from "../Dashboard/Card";
import { GameObj, SpriteComp, PosComp, AreaComp, Vec2, TextComp, OriginComp } from "kaboom";

import { games } from "../Dashboard/GameCardStack";

const mapLayout = //26x9
`
||||||||||||||||||||||||||
|a                      a|
sa                      a|
|a                      a|
ea                      a|
|a                      a|
ra                      a|
|a                      a|
||||||||||||||||||||||||||`.split("\n");
mapLayout.shift();

const Dogeball = ({ studySet }: { studySet: StudySet }) => {
    const [open, setOpen] = useState<boolean>(false)

    const cRef = useRef<HTMLCanvasElement>(null);
    const [reload, setReload] = useState<boolean>(false);

    const toast = useToast()

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
        setInterval(() => {
			if (cRef.current) {
                cRef.current.click();
			    cRef.current.focus();
            }
		}, 100);

        async function Launch() {
            const kab = await import("kaboom").then((mod) => mod.default({ canvas: cRef.current || undefined, background: [137, 142, 140], width: cRef.current?.scrollWidth, height: cRef.current?.scrollHeight }));
            await loadSprite("bean", "/sprites/bean.png");
            await loadSprite("wall", "/sprites/wall.jpeg");
            await loadSprite("water", "/sprites/water.jpeg");
            await loadSprite("grass", "/sprites/grass.png");
            await loadSprite("fish", "/sprites/fish.png");
            await loadSprite("bg", "/sprites/spaceBg2.png");

            await loadSprite("teammate", "/sprites/goodBean.png");
            await loadSprite("enemy", "/sprites/badBean.png");

            await loadSprite("spawnArea", "/sprites/spawnArea.png")

            await loadSprite("apple", "/sprites/apple.png");

            await loadSprite("upgradeRange", "/sprites/upgradeRange.png");
            await loadSprite("upgradeRate", "/sprites/upgradeFirerate.png");
            await loadSprite("upgradeS", "/sprites/upgradeSpeed.png");

            let start = false;

            let SPEED = 50
            let RANGE = 250
            let FIRERATE = 5

            add([
                sprite("bg", {
                    width: width(),
                    height: height()
                }),
                pos(0, 0),
                fixed()
            ]);
			const beforeStart: GameObj<TextComp | PosComp | OriginComp>[] = [
				add([
					text("Click Anywhere To Start", {
						size: width() / 25
					}),
					pos(center().x, center().y-60),
					kab.origin("center"),
				]), 
				add([
					text('use "w", "a", "s" and "d" or arrow keys to move around\npress "space", or "q" to answer questions\npress "e" to deploy troops\nuse "z" to zoom in/out', {
						size: width() / 50,
						lineSpacing: 10
					}),
					pos(center().x, center().y+100),
					kab.origin("center"),
				])
			];
            async function startGame() {
                if (start) return;
                start = true;

				beforeStart.forEach((e) => {e.destroy()})

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
                        solid(),
                        "wall"
                    ],
                    " ": () => [
                        sprite("grass", {
                            width: wallXY,
                            height: wallXY
                        })
                    ],
                    "p": () => [
                        sprite("grass", {
                            width: wallXY,
                            height: wallXY
                        })
                    ],
                    "a": () => [
                        sprite("spawnArea", {
                            width: wallXY,
                            height: wallXY
                        })
                    ],
                    "r": () => [
                        sprite("upgradeRange", {
                            width: wallXY,
                            height: wallXY
                        }),
                        area(),
                        solid(),
                        "upgradeRange"
                    ],
                    "e": () => [
                        sprite("upgradeRate", {
                            width: wallXY,
                            height: wallXY
                        }),
                        area(),
                        solid(),
                        "upgradeFirerate"
                    ],
                    "s": () => [
                        sprite("upgradeS", {
                            width: wallXY,
                            height: wallXY
                        }),
                        area(),
                        solid(),
                        "upgradeS"
                    ]
                });

                scene("defeat", () => {
                    add([
                        text("Defeat!", {
                            size: width() / 25,
                        }),
                        pos(center()),
                        kab.origin("center"),
                    ]);
                });

                scene("victory", () => {
                    add([
                        text("Victory!", {
                            size: width() / 25,
                        }),
                        pos(center()),
                        kab.origin("center"),
                    ]);
                });

                const player = add([
                    sprite("bean", {
                        width: wallXY,
                    }),
                    pos(mapObj.getPos(itemXLen / 2, itemYLen / 2)),
                    area(),
                    solid()
                ]);
                const cash = add([
                    text("Cash: 0"),
                    pos(0, 0),
                    fixed(),
                    { value: 0 },
                ])

                var zoomOut = false

                var p = player.pos

                var closestEnemy = {x: mapObj.width()*2, y: 0}
                var closestTeammate = {x: 0, y: 0}

                var teammates: GameObj<SpriteComp | PosComp | AreaComp | { speed: number, lastShot: any }>[] = [];
				let enemies: GameObj<SpriteComp | PosComp | AreaComp | { speed: number, lastShot: any }>[] = [];

                function deployEnemy() {
                    const enemy = add([
                        sprite("enemy", {
                            width: wallXY,
                        }),
                        pos(mapObj.getPos(24, rand(1,7))),
                        area(),
                        {speed: SPEED*0.9+rand(-SPEED/10, SPEED/10), lastShot: new Date()}
                    ]);
                    enemy.flipX(true)
                    enemies.push(enemy)
                    enemy.onUpdate(() => {
                        if (enemy.pos.x < closestEnemy.x) {closestEnemy.x=enemy.pos.x; closestEnemy.y=enemy.pos.y}

                        if (enemy.pos.x < mapObj.getPos(2.2, 0).x) {go("defeat")}

                        if (enemy.pos.x <= closestTeammate.x+RANGE) {
                            if ((new Date().valueOf() - enemy.lastShot.valueOf())/1000 > FIRERATE) {
                                enemy.lastShot = new Date()

                                const m = {'x': closestTeammate.x, 'y': closestTeammate.y}
                                    
                                const e: any = add([
                                    sprite("apple", {
                                        width: wallXY,
                                    }),
                                    pos(enemy.pos.x, enemy.pos.y),
                                    lifespan(2),
                                    area(),
                                    {
                                        speed: 100,
                                        di: [
                                            m["x"] - enemy.pos.x - 50,
                                            m["y"] - enemy.pos.y - 50,
                                        ],
                                    },
                                ]);
                                e.onUpdate(() => {
                                    e.move(e.di[0], e.di[1]);
                                    for (let i = 0; i < teammates.length; i++) {
                                        if (e.isTouching(teammates[i])) {
                                            teammates[i].pos.x=0-mapObj.width()
                                            teammates[i].destroy();
                                            teammates.splice(i, 1)
                                            e.destroy();
                                            closestTeammate.x=0-mapObj.width()
                                            break
                                        }
                                    }
                                });
                            }

                        } else {
                            enemy.move(-enemy.speed, 0)
                        }
                    })
                };

                function deployTeammate() {
                    const teammate = add([
                        sprite("teammate", {
                            width: wallXY,
                        }),
                        pos(mapObj.getPos(1, rand(1,7))),
                        area(),
                        {speed: SPEED+rand(-SPEED/20, SPEED/20), lastShot: new Date()}
                    ]);
                    teammates.push(teammate)
                    teammate.onDestroy(() => {teammate.pos.x = 0})
                    teammate.onUpdate(() => {
                        if (teammate.pos.x > closestTeammate.x) {closestTeammate.x=teammate.pos.x; closestTeammate.y=teammate.pos.y}

                        if (teammate.pos.x > mapObj.getPos(22.8, 0).x) {go("victory")}

                        if (teammate.pos.x >= closestEnemy.x-RANGE) {
                            if ((new Date().valueOf() - teammate.lastShot.valueOf())/1000 > FIRERATE) {
                                teammate.lastShot = new Date()

                                const m = {x: closestEnemy.x, y: closestEnemy.y}

                                const p = {x: teammate.pos.x, y: teammate.pos.y}

                                wait(rand(), () => {
                                        
                                    const e: any = add([
                                        sprite("apple", {
                                            width: wallXY,
                                        }),
                                        pos(p.x, p.y),
                                        lifespan(2),
                                        area(),
                                        {
                                            speed: 100,
                                            di: [
                                                m["x"] - p.x - 50,
                                                m["y"] - p.y - 50,
                                            ],
                                        },
                                    ]);
                                    e.onUpdate(() => {

                                        e.move(e.di[0], e.di[1]);
                                        for (let i = 0; i < enemies.length; i++) {
                                            if (e.isTouching(enemies[i])) {
                                                enemies[i].pos.x=mapObj.width()*2
                                                enemies[i].destroy();
                                                enemies.splice(i, 1)
                                                e.destroy();
                                                closestEnemy.x=mapObj.width()*2
                                                break
                                            }
                                        }
                                    });
                                })
                            }
                        } else {
                            teammate.move(teammate.speed, 0)
                        }
                    })
                };

                const check = setInterval(() => {
                    if (teammates.length > enemies.length) {
                        wait(rand(2, 7), () => {
                            if (teammates.length > enemies.length) {
                                for (let i = 0; i < (teammates.length-enemies.length)+rand(0-teammates.length/2,teammates.length/2); i++) {
                                    deployEnemy()
                                }
                            }
                        })

                    }
                    if (rand() > 0.9) {
                        for (let i=0; i<10; i++) {
                            deployEnemy()
                        }
                    }
                }, 3000);                 

                player.onUpdate(() => {
                    camPos(p)

                });

                onKeyDown(["left", "a"], () => {
                    player.flipX(true);
                    player.move(-400, 0);
                });
                onKeyDown(["right", "d"], () => {
                    player.flipX(false);
                    player.move(400, 0);
                });
                onKeyDown(["up", "w"], () => {
                    player.move(0, -400);
                });
                onKeyDown(["down", "s"], () => {
                    player.move(0, 400);
                });

                onKeyPress(["z"], () => {
                    zoomOut = !zoomOut
                    if (zoomOut == true) {
                        p = mapObj.getPos(13, 4)
                        camScale(vec2(0.5))
                    } else {
                        camScale(vec2(1.0))
                        p = player.pos
                    }
                })

                onKeyPress(["space", "q"], () => {
                    setOpen(true)
                    cash.value += 3;
                    cash.text = "Cash: "+cash.value;
                })

                onKeyPress("e", () => {
                    if (cash.value > 0) {
                        cash.value --;
                        cash.text = "Cash: "+cash.value;

                        for (let x=0; x < 2; x++) {
                            deployTeammate()
                            // wait(rand(1, 5), () => {
                            //     if (teammates.length < 10) {
                            //         deployEnemy()
                            //     } else {
                            //         if (rand() > 0.2) {
                            //             deployEnemy()
                            //         }
                            //     }
                            // })
                            // wait(rand(10, 30), () => {
                            //     if (teammates.length*0.95 > enemies.length) {
                            //         deployEnemy()
                            //     }
                            // })
                        }
                    } else {
                        toast({
                            title: 'Out of cash',
                            description: "Press \"space\" to answer questions and earn cash.",
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                })


                onKeyPress("f", () => {

                    let touching = false

                    every("upgradeS", (s) => {
                        if (player.isTouching(s))
                        touching = true;
                    });
                    if (touching) {

                        if (cash.value >= SPEED/10) {
                           cash.value -= SPEED/10
                           cash.text = "Cash: " + cash.value;
                           SPEED += 50;
                        } else {
                            toast({
                                title: 'Not enough money',
                                description: "you need $"+SPEED/10+" for that upgrade!",
                                status: 'warning',
                                duration: 5000,
                                isClosable: true,
                            })
                        }
                    }

                    touching=false

                    every("upgradeRange", (s) => {
                        if (player.isTouching(s))
                        touching = true;
                    });
                    if (touching) {

                        if (cash.value >= RANGE/50) {
                           cash.value -= RANGE/50
                           cash.text = "Cash: " + cash.value;
                           RANGE += 50;
                        } else {
                            toast({
                                title: 'Not enough money',
                                description: "you need $"+RANGE/50+" for that upgrade!",
                                status: 'warning',
                                duration: 5000,
                                isClosable: true,
                            })
                        }
                    }

                    touching=false

                    every("upgradeFirerate", (s) => {
                        if (player.isTouching(s))
                        touching = true;
                    });
                    if (touching) {

                        if (cash.value >= 10+Math.floor(2*(5-FIRERATE))) {
                           cash.value -= 10+Math.floor(2*(5-FIRERATE))
                           cash.text = "Cash: " + cash.value;
                           FIRERATE /= 1.2;
                        } else {
                            toast({
                                title: 'Not enough money',
                                description: "you need $"+(10+Math.floor(2*(5-FIRERATE)))+" for that upgrade!",
                                status: 'warning',
                                duration: 5000,
                                isClosable: true,
                            })
                        }
                    }

                    touching=false
                });

                every("upgradeS", (s) => {
                    var enabled = false
                    s.onUpdate(() => {
                        if (player.isTouching(s) && enabled == false) {
                            enabled = true
                            toast({
                                title: 'Upgrade Speed',
                                description: "Press \"F\" to upgrade your teams speed.",
                                status: 'info',
                                variant: "left-accent",
                                duration: 3000,
                                isClosable: true,
                            })
                            wait(3.1, () => {enabled = false})
                        }
                    })
                });

                every("upgradeFirerate", (s) => {
                    var enabled = false
                    s.onUpdate(() => {
                        if (player.isTouching(s) && enabled == false) {
                            enabled = true
                            toast({
                                title: 'Upgrade Firerate',
                                description: "Press \"F\" to upgrade your teams firerate.",
                                status: 'info',
                                variant: "left-accent",
                                duration: 3000,
                                isClosable: true,
                            })
                            wait(3.1, () => {enabled = false})
                        }
                    })
                });

                every("upgradeRange", (s) => {
                    var enabled = false
                    s.onUpdate(() => {
                        if (player.isTouching(s) && enabled == false) {
                            enabled = true
                            toast({
                                title: 'Upgrade Range',
                                description: "Press \"F\" to upgrade your teams range.",
                                status: 'info',
                                variant: "left-accent",
                                duration: 3000,
                                isClosable: true,
                            })
                            wait(3.1, () => {enabled = false})
                        }
                    })
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
            <Questions
				questions={studySet.questions}
				open={open}
				isOpen={setOpen}
			/>
        </>
    )
}

export default Dogeball;