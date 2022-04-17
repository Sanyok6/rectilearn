# **This is the repo for the TWT codejam 2022**
# by Team Rectifiers

## Our Goal  

> To create a website which helps people to study by having multiple games and by allowing users to create study sets.

- Studysets  
    Studysets will be similar to notes. A user can create a study set which has a bunch of questions and the corresponding answer. The user can practice by answering the questions in the studyset they made. If they get an answer wrong they will have to enter the correct answer 3 times. This is to make sure that the user will not get that question wrong again.


### Our team
- Atlas#0193
- llama#9999
- Sanya#0200
- Rush2618#8281
- VG#8554

## Frontend/Backend/Database

- Frontend
    > Frontend will be written using [`Next.js`](https://nextjs.org/).
    - Devs
      - llama
      - Sanya

- Backend
    > Backend will be written in [`python`](https://www.python.org/) and will use the [`FastAPI`](https://fastapi.tiangolo.com/) library.  
    JSON Web Tokens will be used as the authentication method.
    - Devs
        - VG
        - Rush2618

- Games
    > The games will web based games created using Unity and JavaScript.  
    The games will be simple, fun and interactive web games and at a certain time there will be a popup question and they'll need to answer it to continue the playing game
    - Devs
        - Atlas
        - llama
        - Sanya
        - Rush2618
        - VG

- Database
    > The database of choice is [`PostgreSQL`](https://www.postgresql.org/).  

- Deployment
    > The backend will be hosted on [Railway](https://railway.app/)

___

## Pages
- Welcome page
    > This page is well styled, and should explain the basic features of the website, as well as prompt the user to make an account.

- User dashboard
    > Here the user will find the games and studysets which they can use to study.
___

# Extra project details

___
## Project requirements

### [pnpm](https://pnpm.io)
### [nodejs](https://nodejs.org)
### [pipenv](https://pipenv.pypa.io/en/latest/)
___

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a packages manager. It includes the following packages/apps:

### Apps

- `frontend`: another [Next.js](https://nextjs.org) app
- `backend`: The [FastAPI](https://fastapi.tiangolo.com/) app

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
