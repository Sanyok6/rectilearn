import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import Questions from "../../../components/questions";

import { useToast } from "@chakra-ui/react";
import useSWR from "swr";
import { GameObj, SpriteComp, PosComp, AreaComp } from "kaboom";
import { StudySetQuestion } from "../../../components/Dashboard/Card";
import { useRouter } from "next/router";

const mapLayout = `
|||||||||||||||||
|               ||||||||||||||||||||
|                                  |
|                                  |
|            $                     |
|           $$  |            $     |
|          $$$$ |           $$     |
|          $$$$ |!          $$$   ||
|          $$$$ |           $$$  ||
|           $$  |@           $  ||
|               |              ||
|||    ||||||||||             ||
|                            ||
|                           ||
|                          ||
||||||||||||||||||||||||||||`.split("\n");
mapLayout.shift();

const fetcher = (url: string) =>
	fetch(url, { headers: { "Content-Type": "application/json" } }).then(
		(res) => res.json()
	);

const fetchQuestion = () =>
	fetch("http://localhost:3000/api/studysets/questions/random/", {
		headers: { "Content-Type": "application/json" },
	})
		.then((res) => res.json())
		.catch(console.error);

const Game: NextPage = () => {
	const questionLoading = { question: "Loading", answers: ["Loading"] };
	const { data: randomQuestion, error } = useSWR<StudySetQuestion>(
		"http://localhost:3000/api/studysets/questions/random/",
		fetcher
	);
	const [open, setOpen] = useState<boolean>(false);
	const [question, setQuestion] = useState<StudySetQuestion>(
		randomQuestion || questionLoading
	);

	// fetchQuestion().then(data => setQuestion(data));
	// fetchQuestion().then(setQuestion);

	const cRef = useRef<HTMLCanvasElement>(null);
	const [reload, setReload] = useState<boolean>(false);

	const toast = useToast();

	useEffect(() => {
		if (randomQuestion) {
			setQuestion(randomQuestion);
		}
		if (error) console.log(error);
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
			const beforeStart = add([
				text("Click Anywhere To Start", {
					size: width() / 25,
				}),
				pos(center()),
				kab.origin("center"),
			]);
			async function startGame() {
				if (start) return;
				start = true;
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
					SpriteComp | PosComp | AreaComp | { speed: number }
				>[] = [];

				function addEnemy() {
					let e = add([
						sprite("badBean", {
							width: wallXY,
						}),
						pos(
							mapObj.getPos(
								itemXLen / 20 + rand(1, 20),
								itemYLen / 10 + rand(1, 10)
							)
						),
						area(),
						{ speed: 1 },
					]);
					enemies.push(e);
					for (var i in enemies) {
						enemies[i].onUpdate(() => {
							let enemy = enemies[i];
							let x = -1 + 2 * +(enemy.pos.x < player.pos.x);
							let y = -1 + 2 * +(enemy.pos.y > player.pos.y);
							enemy.flipX(enemy.pos.x > player.pos.x);
							// enemy.move((x)*10, (y)*(-10))
							enemy.moveTo(player.pos, 10);

							if (enemy.isTouching(player)) {
								enemy.destroy();
								health.value--;
								health.text = "Health: " + health.value;
								if (health.value <= 0) {
									go("gameover");
								}
							}
						});
					}
					if (new_enemy_count >= 1) {
						new_enemy_count = 0;
						addEnemy();
					}
				}

				for (let i = 0; i < 3; i++) {
					addEnemy();
				}

				beforeStart.destroy();
				player.onUpdate(() => {
					camPos(player.pos);
				});

				onMousePress((p) => {
					if (ammo.value <= 0) {
						toast({
							title: "Not enough ammo",
							description:
								'press "e" to answer questions, and gain ammo',
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

								new_enemy_count += 0.1;

								addEnemy();
							}
						}
					});
				});

				onKeyDown(["left", "a"], () => {
					player.flipX(true);
					player.move(-SPEED, 0);
				});

				onKeyPress(["z", "e"], () => {
					ammo.value++;
					ammo.text = "Ammo: " + ammo.value;

					fetchQuestion().then((data) => {
						setQuestion(data || questionLoading);
						setOpen(true);
					});
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

				onKeyPress("space", () => {
					let touching = false;
					every("water", (s) => {
						if (player.isTouching(s)) {
							touching = true;
						}
					});

					touching = false;

					every("store", (s) => {
						if (player.isTouching(s)) touching = true;
					});

					touching = false;

					touching = false;

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
				question={question.question}
				answer={question.answers[0]}
				open={open}
				isOpen={setOpen}
			/>
		</>
	);
};

export default Game;
