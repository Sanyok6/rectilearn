**This is the repo for the TWT codejam "Team Rectifiers"** 

**Our plan:**

Goal: Create a website for studying (foreign languages) with many simple (web based) study games to make studying "less ordinary" we could make this website similar to gimkit, with a greater focus on user friendliness and many different game modes, as well as a personal dashboard to track your progress.
The games will be simple 2D games, made in birds eye view, there should also be some simpler games like the classical gimkit "collecting money game"

Our team: Atlas, Capitalism, Sanya, Rush2618, and VG

Development fronts:

|Frontend| - Frontend will be written in HTML/CSS and then will be rewritten in next.js
Devs: Sanya, Capitalism, and possibly atlas.

|Backend| -  Develop user authentication, choosing the "Game of the day" and whatever else needs to be done (We will use fastAPI for backend)
Devs: VG, Rush, and atlas (may need to learn fastAPI)

|Database| - Store the user information, as well as the study sets of the user (NastyPigz wants to use Deta Base SDK)
Devs: We can decide

|Game Dev| - Create simple 2D games in JS (the more the better!) that let the user practice their study sets (idk what you guys want to use)
Devs: Capitalism, Rush (This is kinda the whole point of the project, so this should be done well)


Pages:

    |Welcome page| This page should be well styled, and should explain the basic features of the website, as well as prompt the user to make an account

    |User dashboard| Here the user will find the "Study game of the day", be able to create/import study sets, and track their progress.

    |Games| We should have about 10-15 different games to make the website "less ordinary" the user gets to choose a study set and then they could practice their words in the game. Games should be as unique as possible, and lets keep the games simple to keep up with the theme. (the more games the better!) 


**Timeline:**

April 6  } Setup our work environment
April 7  } Start work on barebones of website, games, and everything else
April 8  } Continue work from yesterday 
April 9  } Start setting up user auth
April 6  } Continue work from yesterday
April 10 } Add the ability to create study sets
April 11 } Add more stuff to dashboard
April 12 } Start integrating the games into the website
April 13 } Continue work from yesterday
April 14 } Continue work from yesterday and add finishing touches
April 15 } Make sure everything works and add finishing touches

We might have a few more days, but we should have some extra time at the end


## Packager Requirements

[pnpm](https://pnpm.io)
[nodejs](https://nodejs.org)
[pipenv](https://pipenv.pypa.io/en/latest/)

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a packages manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org) app
- `frontend`: another [Next.js](https://nextjs.org) app
- `backend`: a [FastApi](https://fastapi.tiangolo.com/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

`ui`, `docs` and `frontend` is 100% [TypeScript](https://www.typescriptlang.org/).
`backend` is 100% [Python](https://www.python.org)

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

This repository is used in the `npx create-turbo@latest` command, and selected when choosing which package manager you wish to use with your monorepo (PNPM).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd root_dir_name
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd root_dir_name
pnpx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
