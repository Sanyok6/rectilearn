import { useEffect, useState, useRef } from "react";
import Questions from "../../../components/questions";

/*
    $ = lava
*/
const gameMap = `
|                  |
|                  |
|                  |
|                  |
|                  |
|                  |
|                  |
|                  |
|                  |
|                  |
|                  |
|                  |
|                  |
|$$$$$$$$$$$$$$$$$$|
|$$$$$$$$$$$$$$$$$$|
|$$$$$$$$$$$$$$$$$$|
|$$$$$$$$$$$$$$$$$$|
|$$$$$$$$$$$$$$$$$$|`.split("\n");
gameMap.shift();

const lavaGame = () => {
	const cRef = useRef<HTMLCanvasElement>(null);
	const [reload, setReload] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(true);
	useEffect(() => {
		window.onresize = () => {
			setReload((reload) => !reload);
		};

		if (cRef.current) {
			cRef.current.style.width = "100vw";
			cRef.current.style.height = "100vh";
			cRef.current.style.position = "fixed";
			cRef.current.focus();
			cRef.current.click();
		}
		setInterval(() => {
			if (cRef.current) {
                cRef.current.click();
			    cRef.current.focus();
            }
		}, 1);
		async function Launch() {
			const kab = await import("kaboom").then((mod) =>
				mod.default({
					debug: true,
					canvas: cRef.current || undefined,
					background: [137, 142, 140],
					width: cRef.current?.scrollWidth,
					height: cRef.current?.scrollHeight,
				})
			);
			await loadBean();
			await loadSprite("grayBg", "/sprites/grayBg.webp");
			await loadSprite("lava", "/sprites/lava.jpeg");
			await loadSprite("wall", "/sprites/wall.jpeg");
			await loadSprite("platform", "/sprites/platform.jpeg");
			gravity(2000);

			add([
				sprite("grayBg", {
					width: width(),
					height: height(),
				}),
				pos(0, 0),
				fixed(),
			]);

			const mapX = gameMap[0].length;
			const mapY = gameMap.length;

			const wallXY = Math.max(width() / mapX, height() / mapY);

            const SPEED = wallXY * 10;
			const lavaRaiseSpeed = 10;
			const JUMP_FORCE = wallXY * 16;
			const NUM_PLATFORMS = 20;

			add([text("Points: 0"), pos(0, 0), fixed(), { value: 0 }]);

			scene("gameover", () => {
				add([
					text("Game Over!", {
						size: width() / 25,
					}),
					pos(center()),
					kab.origin("center"),
				]);
			});

			for (let i = 1; i < NUM_PLATFORMS; i++) {
				add([
					sprite("wall", {
						width: wallXY,
						height: wallXY / 2,
					}),
					area(),
					pos(
						rand(0 + wallXY * 2, width() - wallXY * 2),
						(-i * (wallXY * 60)) / NUM_PLATFORMS + wallXY * 12
					),
					solid(),
					kab.origin("center"),
					"platform",
					{
						speed: rand(50, 120),
						dir: choose([-1, 1]),
                        answered: false
					},
                    outview({
                        hide: true
                    })
				]);
			}

			function spin(speed = 1200) {
				let spinning = false;
				return {
					require: ["rotate"],
					update(this: any) {
						if (!spinning) {
							return;
						}
						this.angle -= speed * dt();
						if (this.angle <= -360) {
							spinning = false;
							this.angle = 0;
						}
					},
					spin() {
						spinning = true;
					},
				};
			}

			const player = add([
				sprite("bean", {
					width: wallXY,
				}),
				pos(center()),
				kab.origin("center"),
				area(),
				body({ jumpForce: JUMP_FORCE }),
				spin(),
				rotate(0),
			]);

			player.pos = get("platform")[0].pos.sub(0, 64);

			addLevel(gameMap, {
				width: wallXY,
				height: wallXY,
				"|": () => [
					sprite("wall", {
						width: wallXY,
						height: wallXY,
					}),
					area(),
					solid(),
					"wall",
				],
				$: () => [
					sprite("lava", {
						width: wallXY,
						height: wallXY,
					}),
					area(),
					"lava",
				],
				// _: () => [
				// 	sprite("platform", {
				// 		width: wallXY,
				// 		height: wallXY,
				// 	}),
				// 	area(),
				// 	solid(),
				// 	"platform",
				// 	outview({ hide: true, pause: true }),
				// 	{ answered: false },
				// ],
			});

			onUpdate("platform", (p) => {
                console.log(p);
                if (p.isOutOfView()) return;
				if (player.isTouching(p)) {
					player.move(p.dir * p.speed, 0);
				}
				p.move(0, lavaRaiseSpeed);
				p.move(p.dir * p.speed, 0);
				every("lava", (o) => {
					if (p.isTouching(o)) {
						destroy(p);
					}
				});
				if (
					p.pos.x < 0 + wallXY * 2 ||
					p.pos.x > width() - wallXY * 2
				) {
					p.dir = -p.dir;
				}
			});
			player.onCollide("lava", (_) => go("gameover"));
			player.onCollide("wall", (o) => {
				if (player.isTouching(o)) {
					player.moveTo(
						o.pos.x < player.pos.x
							? player.pos.x + 1
							: player.pos.x - 1,
						player.pos.y
					);
				}
			});
			player.onUpdate(() => {
                if (player.pos.y > 1000) go("gameover");
				camPos(player.pos);
			});
			player.onDoubleJump(() => {
				player.spin();
			});
			onKeyPress("space", () => {
				player.doubleJump();
			});
			onKeyDown("left", () => {
				player.flipX(true);
				player.move(-SPEED, 0);
			});
			onKeyDown("right", () => {
				player.flipX(false);
				player.move(SPEED, 0);
			});
		}
		Launch();
		return () => every(destroy);
	}, [reload]);
	return (
		<>
			<canvas ref={cRef}></canvas>
			<Questions
				question="What is 2+2"
				answer="4"
				open={open}
				isOpen={setOpen}
			/>
		</>
	);
};

export default lavaGame;
