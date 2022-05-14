import { useState, useEffect, useRef } from "react";
import Questions from "../../components/questions";

import { useToast } from "@chakra-ui/react";
import { GameObj, SpriteComp, PosComp, AreaComp } from "kaboom";
import { StudySet } from "../Dashboard/Card";

const layouts = [
`
|||||||||||||||||
|A             A||||||||||||||||||||
|                                  |
|                                  |
|            $                     |
|           $$  |            $     |
|          $$$$ |           $$     |
|          $$$$ |!          $$$   ||
|          $$$$ |           $$$  ||
|           $$  |@           $  ||
|A              |              ||
|||    ||||||||||             ||
|                            ||
|                           ||
|                         A||
||||||||||||||||||||||||||||`.split("\n"),
]

const mapLayout = layouts[Math.floor(Math.random() * layouts.length)]

mapLayout.shift();


const FoodFight = ({ studySet }: { studySet: StudySet }) => {
	const cRef = useRef<HTMLCanvasElement>(null);
	const [reload, setReload] = useState<boolean>(false);
	const [open, isOpen] = useState<boolean>(false);
	const toast = useToast();

	useEffect(() => {
		window.onresize = () => {
			setReload((reload) => !reload);
		};
		if (cRef.current) {
			cRef.current.style.width = "100vw";
			cRef.current.style.height = "100vh";
			cRef.current.style.position = "fixed";
			cRef.current.focus();
		}
		async function Launch() {
			const kab = await import("kaboom").then((mod) =>
				mod.default({
					canvas: cRef.current || undefined,
					background: [137, 142, 140],
					width: cRef.current?.scrollWidth,
					height: cRef.current?.scrollHeight,
				})
			);
			await loadSprite("bean", "/sprites/bean.png");
			await loadSprite("wall", "/sprites/wall.jpeg");
			await loadSprite("water", "/sprites/water.jpeg");
			await loadSprite("grass", "/sprites/grass.png");
			await loadSprite("bg", "/sprites/spaceBg.jpg");

			await loadSprite("upgradeM", "/sprites/upgradeMoney.png");
			await loadSprite("upgradeS", "/sprites/upgradeSpeed.png");

			await loadSprite("apple", "/sprites/apple.png");
			await loadSprite("badBean", "/sprites/badBean.png");

			await loadSprite("spawnArea", "/sprites/spawnArea.png");

			let start = false;
			let SPEED = 400;
			let COST = 1;

			add([
				sprite("bg", {
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
					text('use "w", "a", "s" and "d" or arrow keys to move around\npress "space", "e", or "q" to answer questions\nclick to shoot at enemies', {
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
				const wallXY = Math.max(
					width() / itemXLen,
					height() / itemYLen
				);
				const mapObj = addLevel(mapLayout, {
					width: wallXY,
					height: wallXY,

					"|": () => [
						sprite("wall", {
							width: wallXY,
							height: wallXY,
						}),
						area(),
						solid(),
					],
					$: () => [
						sprite("water", {
							width: wallXY,
							height: wallXY,
						}),
						area(),
						solid(),
						"water",
					],
					"!": () => [
						sprite("upgradeM", {
							width: wallXY,
							height: wallXY,
						}),
						area(),
						solid(),
						"upgradeM",
					],
					"@": () => [
						sprite("upgradeS", {
							width: wallXY,
							height: wallXY,
						}),
						area(),
						solid(),
						"upgradeS",
					],
					"A": () => [
						sprite("spawnArea", {
							width: wallXY,
							height: wallXY,
						}),
					],
					" ": () => [
						sprite("grass", {
							width: wallXY,
							height: wallXY,
						}),
					],
				});

				scene("gameover", () => {
					add([
						text("Game Over!", {
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
					solid(),
				]);

				const health = add([
					text("Health: 5"),
					pos(0, 0),
					fixed(),
					{ value: 5 },
				]);
				const ammo = add([
					text("Ammo: 10"),
					pos(0, 80),
					fixed(),
					{ value: 10 },
				]);
				const cash = add([
					text("Cash: 0"),
					pos(0, 160),
					fixed(),
					{ value: 0 },
				]);

				let new_enemy_count = 0;
				let enemies: GameObj<
					SpriteComp | PosComp | AreaComp | { speed: number, destroyed: boolean }
				>[] = [];

				function addEnemy() {
					const p = [[1, 1], [15, 1], [1, 10], [26, 14]][Math.floor(Math.random() * 4)]
					let e = add([
						sprite("badBean", {
							width: wallXY,
						}),
						pos(
							mapObj.getPos(
									p[0],
									p[1]
								// itemXLen / 20 + rand(1, 20),
								// itemYLen / 10 + rand(1, 10)
							)
						),
						area(),
						{ speed: rand(10, 25), destroyed: false },
					]);
					enemies.push(e);

					e.onUpdate(() => {
						let enemy = e;
						let x = -1 + 2 * +(enemy.pos.x < player.pos.x);
						let y = -1 + 2 * +(enemy.pos.y > player.pos.y);
						enemy.flipX(enemy.pos.x > player.pos.x);
						// enemy.move((x)*10, (y)*(-10))
						enemy.moveTo(player.pos, enemy.speed);

						if (enemy.isTouching(player)) {
							enemy.destroy();
							if (!enemy.destroyed) {
								health.value--;
								health.text = "Health: " + health.value;
								if (health.value <= 0) {
									go("gameover");
								}
								enemy.destroyed = true
							}
							shake(100)
						}
					});
					// for (var i in enemies) {
					// 	enemies[i].onUpdate(() => {
					// 		let enemy = enemies[i];
					// 		let x = -1 + 2 * +(enemy.pos.x < player.pos.x);
					// 		let y = -1 + 2 * +(enemy.pos.y > player.pos.y);
					// 		enemy.flipX(enemy.pos.x > player.pos.x);
					// 		// enemy.move((x)*10, (y)*(-10))
					// 		enemy.moveTo(player.pos, 10);

					// 		if (enemy.isTouching(player)) {
					// 			enemy.destroy();
					// 			if (!enemy.destroyed) {
					// 				health.value--;
					// 				health.text = "Health: " + health.value;
					// 				if (health.value <= 0) {
					// 					go("gameover");
					// 				}
					// 				enemy.destroyed = true
					// 			}
					// 		}
					// 	});
					// }
					if (new_enemy_count >= 1) {
						new_enemy_count = 0;
						addEnemy();
					}
				}

				for (let i = 0; i < 5; i++) {
					addEnemy();
				}

				player.onUpdate(() => {
					camPos(player.pos);
				});

				onMousePress((p) => {
					if (ammo.value <= 0) {
						toast({
							title: "Not enough ammo",
							description: 'Press "e" to answer questions, and gain ammo!',
							status: "error",
							duration: 5000,
							isClosable: true,
						});
						return;
					}
					const m = toWorld(p);
					const e: any = add([
						sprite("apple", {
							width: wallXY,
						}),
						pos(player.pos.x, player.pos.y),
						lifespan(2),
						area(),
						{
							speed: 100,
							di: [
								m["x"] - player.pos.x - 50,
								m["y"] - player.pos.y - 50,
							],
						},
					]);

					ammo.value--;
					ammo.text = "Ammo: " + ammo.value;

					e.onUpdate(() => {
						e.move(e.di[0], e.di[1]);

						for (let i in enemies) {
							if (e.isTouching(enemies[i])) {
								enemies[i].destroy();
								e.destroy();

								cash.value += COST;
								cash.text = "Cash: " + cash.value;

								new_enemy_count += 0.25;

								addEnemy();
							}
						}
					});
				});

				onKeyDown(["left", "a"], () => {
					player.flipX(true);
					player.move(-SPEED, 0);
				});

				onKeyPress(["space", "q", "e", "z"], () => {
					isOpen(true);
					ammo.value+=5;
					ammo.text = "Ammo: " + ammo.value;
				});

				onKeyDown(["right", "d"], () => {
					player.flipX(false);
					player.move(SPEED, 0);
				});
				onKeyDown(["up", "w"], () => {
					player.move(0, -SPEED);
				});
				onKeyDown(["down", "s"], () => {
					player.move(0, SPEED);
				});

				onKeyPress("f", () => {
					let touching = false;

					every("upgradeM", (s) => {
						if (player.isTouching(s)) touching = true;
					});
					if (touching) {
						if (cash.value >= COST * 5) {
							cash.value -= COST * 5;
							cash.text = "Cash: " + cash.value;
							COST += COST;
						} else {
							toast({
								title: "Not enough money",
								description:
									"you need $" +
									COST * 5 +
									" for that upgrade!",
								status: "warning",
								duration: 5000,
								isClosable: true,
							});
						}
					}

					touching = false;

					every("upgradeS", (s) => {
						if (player.isTouching(s)) touching = true;
					});
					if (touching) {
						if (cash.value >= SPEED / 20) {
							cash.value -= SPEED / 20;
							cash.text = "Cash: " + cash.value;
							SPEED += 200;
						} else {
							toast({
								title: "Not enough money",
								description:
									"you need $" +
									SPEED / 20 +
									" for that upgrade!",
								status: "warning",
								duration: 5000,
								isClosable: true,
							});
						}
					}

					touching = false;
				});


                every("upgradeM", (s) => {
                    var enabled = false
                    s.onUpdate(() => {
                        if (player.isTouching(s) && enabled == false) {
                            enabled = true
                            toast({
                                title: 'Upgrade Money Per Hit',
                                description: "Press \"F\" to upgrade money earned after hitting an enemy.",
                                status: 'info',
								variant: "left-accent",
                                duration: 3000,
                                isClosable: true,
                            })
                            wait(3.1, () => {enabled = false})
                        }
                    })
                });

                every("upgradeS", (s) => {
                    var enabled = false
                    s.onUpdate(() => {
                        if (player.isTouching(s) && enabled == false) {
                            enabled = true
                            toast({
                                title: 'Upgrade Speed',
                                description: "Press \"F\" to upgrade your running speed.",
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
				isOpen={isOpen}
			/>
		</>
	);
};

export default FoodFight;
