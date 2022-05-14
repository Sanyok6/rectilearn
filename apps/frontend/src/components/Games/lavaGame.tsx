import { useEffect, useState, useRef } from "react";
import Questions from "../../components/questions";

import { Button, useToast } from "@chakra-ui/react";
import { StudySet } from "../Dashboard/Card";

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

const LavaGame = ({ studySet }: { studySet: StudySet }) => {
	const cRef = useRef<HTMLCanvasElement>(null);
	
	const [reload, setReload] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	const toast = useToast()

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
		}, 100);

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

            let start = false;

			gravity(2500);

			add([
				sprite("grayBg", {
					width: width(),
					height: height(),
				}),
				pos(0, 0),
				fixed(),
			]);

			const beforeStart = [
				add([
					text("Click Anywhere To Start", {
						size: width() / 25
					}),
					pos(center().x, center().y-60),
					kab.origin("center"),
				]), 
				add([
					text('use "a" and "d" or arrow keys to move around\npress "z", "e", or "q" to answer questions\nuse the space bar or "w" to jump', {
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

				const mapX = gameMap[0].length;
				const mapY = gameMap.length;

				const wallXY = Math.max(width() / mapX, height() / mapY);

				const SPEED = wallXY * 10;
				const JUMP_FORCE = wallXY * 16;
				const NUM_PLATFORMS = 5;

				let lavaRaiseSpeed = 20;

				scene("gameover", () => {
					add([
						text("Game Over!", {
							size: width() / 25,
						}),
						pos(center()),
						kab.origin("center"),
					]);
				});

				function addPlatform(i=4, n=false) {
					console.log("added")
					add([
						sprite("wall", {
							width: wallXY,
							height: wallXY / 2,
						}),
						area(),
						pos(
							rand(0 + wallXY * 2, width() - wallXY * 2),
							// 100
							n == true
								? wallXY + rand(-1, 1)
								: (-i * (wallXY * 15)) / NUM_PLATFORMS + wallXY * 12
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
							// hide: true
							hide: false
						})
					]).onDestroy(() => {addPlatform()})
				}

				for (let i = 1; i < NUM_PLATFORMS; i++) {
					addPlatform(i)
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
				const time = add([
					text("Score: 0"),
					pos(0, 0),
					fixed(),
					{ value: 0, startTime: new Date() },
				]);
				const energyText = add([
					text("Energy: 3"),
					pos(0, 80),
					fixed(),
					{ value: 3 },
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
					// if (p.isOutOfView()) return;
					if (player.pos.y > p.pos.y-80 && player.pos.y < p.pos.y+80) {
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
					// if (player.pos.y > 1000) go("gameover");
					camPos(player.pos);
				});
				player.onDoubleJump(() => {
					player.spin();
				});
				onKeyPress(["space", "w", "up"], () => {
					if (energyText.value > 0) {
						energyText.value --;
						energyText.text = "Energy: "+energyText.value;
						player.doubleJump();
					} else {
						toast({
							title: 'Out of energy',
							description: "Press \"e\" or \"z\" to answer questions and gain energy",
							status: 'error',
							duration: 5000,
							isClosable: true,
						})
					}
				});
				onKeyDown(["left", "a"], () => {
					player.flipX(true);
					player.move(-SPEED, 0);
				});
				onKeyDown(["right", "d"], () => {
					player.flipX(false);
					player.move(SPEED, 0);
				});
				onKeyPress(["z", "e", "q"], () => {
					setOpen(true)
					energyText.value += 2;
					energyText.text = "Energy: "+energyText.value;
				});
				time.onUpdate(() => {
					var timeDiff = new Date().valueOf() - time.startTime.valueOf();
					timeDiff /= 1000;
					var seconds = Math.round(timeDiff);
					time.value = seconds;
					time.text = "Score: "+time.value;

					lavaRaiseSpeed = 20+Math.floor(time.value/2);
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
	);
};

export default LavaGame;
