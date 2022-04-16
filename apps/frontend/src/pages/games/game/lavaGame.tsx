import { useEffect, useState, useRef } from 'react';
import kaboom from 'kaboom';
import Questions from "../../../components/questions";


/*
& = player
$ = lava
_ = floor
question is handled
*/
const gameMap = `
|                  |
|                  |
|                  |
|                  |
|                  |
|$$$$$$$$$$$$$$$$$$|
|$$$$$$$$$$$$$$$$$$|`.split('\n');
gameMap.shift();


const lavaGame = () => {
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
            const SPEED = 320;
            const lavaRaiseSpeed = 10;
            const JUMP_FORCE = 1200;
            await loadSprite("bean", "/sprites/bean.png");
            await loadSprite("grayBg", "/sprites/grayBg.webp");
            await loadSprite("lava", "/sprites/lava.jpeg");
            await loadSprite("wall", "/sprites/wall.jpeg");
            gravity(2400);

            add([
                sprite("grayBg", {
                    width: width(),
                    height: height()
                }),
                pos(0, 0),
                fixed()
            ]);

            const mapX = gameMap[0].length;
            const mapY = gameMap.length;

            const wallXY = Math.max(width() / mapX, height() / mapY);

            const pointsCounter = add([
                text("Points: 0"),
                pos(0, 0),
                fixed(),
                { value: 0 },
            ]);

            const player = add([
                sprite("bean", {width: wallXY}),
                // pos(mapX / 2, mapY / 2),
                pos(0, 0),
                kab.origin(center()),
                area(),
                body({ jumpForce: JUMP_FORCE, }),
            ]);

            addLevel(gameMap, {
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
                "$": () => [
                    sprite("lava", {
                        width: wallXY,
                        height: wallXY
                    }),
                    area(),
                    solid(),
                    "lava"
                ],
            });

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
                if (player.isGrounded()) {
                    player.jump();
                }
            });

        };
        Launch();
        return () => every(destroy);
    }, [reload]);

        return (
        <>
            <canvas ref={cRef}></canvas>
            <Questions question="What is 2+2" answer="4" />
        </>
    )}

export default lavaGame;