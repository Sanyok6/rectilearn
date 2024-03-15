<!-- # https://rectilearn-legacy.vercel.app/ -->

<p align="center"> 
  <img src="src/frontend/public/favicon.ico" alt="Rectilearn Logo" width="80px" height="80px">
</p>
<h1 align="center"> Rectilearn </h1>

## Overview

Rectilearn is an online platform for students of all ages that promotes studying through interactive games. The website allows you to create "study sets" of questions that you want to study, similar to flashcards. But unlike studying with conventional flashcards, Rectilearn provides over five unique games that make learning entertaining and enjoyable. Throughout these games, students are prompted to answer questions from their study set in return for in game power-ups that allow the student to progress through the game. Rectilearn offers both 2D, and 3D games, similar to what students would play instead of studying, making the games truly fun for the students. Unlike other projects with similar missions, Rectilearn's source code is 100% open source, making it the most open and free learning-through-games website.

## Purpose

Rectilearn was initially created for the Tech with Tim hackathon in 2021 April. However, we discovered its potential for an enterprise application, therefore it is still being maintained today! The [rewrite repo](https://github.com/Rectilearn/rectilearn) is written in SvelteKit and TailwindCSS.

## Technologies

Frontend:
- React.js bootstrapped with Next.js
- Kaboom.js (to create the games)
- Chakra ui

Backend:
- FastAPI (API)
- Uvicorn (http server)
- PostgreSQL (database)
- SQLAlchemy (database ORM)

# Usage and demo

<!-- Put a crap ton of pictures here -->

Demo: [https://rectilearn-legacy.vercel.app](https://rectilearn-legacy.vercel.app)

*Note: Due to inactivity, the database and backend have expired as we are no longer financially capable of hosting the postgres database on Google Cloud Service and FastAPI backend on railway*


## Setup instructions

> Run `git clone https://github.com/Sanyok6/Rectilearn/` to clone the repository and `cd` into the Rectilearn folder

### Backend

The backend programmed in python and uses the FastAPI library

#### **Backend prerequisites**

> Python version 3.8 or higher and a local PostgreSQL database is required

### Instructions

1. `cd` into the backend folder by running

    ```shell
    cd src/backend
    ```

2. Create an `.env` in the backend folder file containing

    ```txt
    PRODUCTION=1
    SECRET_KEY={secret_key}
    USE_RAILWAY=0
    POSTGRESQL_URI="://{user}:{password}@127.0.0.1:5432/{database_name}"
    ```

    replace the `{}` with the relevant values

    you can obtain a new secret key by running the following code

    ```shell
    python3 -c 'import secrets;print(secrets.token_urlsafe(32))'
    ```

    Note: You can use cockroachdb as our database schemas are compatible. More information is in the database.py file

3. Create a virtual python environment and activate it

    ```shell
    python3 -m venv ./venv
    source ./venv/bin/activate
    ```

4. Install the dependencies

    ```shell
    pip install -r requirements.txt
    ```

5. Apply the database migrations

    ```txt
    alembic upgrade head
    ```

6. Run the web server

    ```shell
    uvicorn main:app
    ```

### Frontend

#### **Frontend prerequisites**

> Node version > 18.15.0 and npm version > 9.5.0

1. `cd` into the frontend folder

    ```shell
    cd src/frontend
    ```

2. Install the dependencies

    ```shell
    npm install
    ```

3. Run the frontend

    ```shell
    npm run dev
    ```

### Project structure

```txt
Rectilearn/
├── src/
│
├── backend/ - Backend server code
│      ├── alembic/ - Database migrations
│
├── frontend/
│      ├── public/ - Static assets for the website
│      ├── src/ - Contains the source code of the frontend web application
│      │      ├ components/ - UI components of the website
│      │      ├ lib/ - Library code 
│      │      ├ pages/ - URL endpoints (pages) of the website
│      │      ├ utils/ - Utility functions for the functionality of the website
│
├── webgl-builds/ - Contains the WebGL builds for the bush game
│
├── .vscode/ - Contains vscode configuration
```
