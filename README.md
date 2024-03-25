# Findit - the README

#### To run backend do

1. `cd backend` and run `npm install`
2. ANY Extra steps to run backend
3. Run `npm start`

You can see your api in url `http://localhost:3001/`
Tip: (you will need to change your backend port number so it doesn't conflict with frontend port number)

#### To run frontend do

1. `cd frontend` and run `npm install`
2. ANY Extra steps to run frontend
3. Run `npm start`

You can see your project at `http://localhost:3000/`

---

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/nijsPAY-)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12917868&assignment_repo_type=AssignmentRepo)
Template for the project 2023 Winter
Your project infomration and assigment https://docs.google.com/document/d/1NB0rCDMe5Ua_KcNPXDjWTwBU49EI74RehVgfxSBVoNg/edit?usp=sharing

Your project should be split into 2 folders:

- Backend
- Frontend

Each folder should have their own JS projects, so both of them will be have their own package.json, node_modules, .gitignore files etc.

The respository should include exact steps how to run your project.
Also we need to be able to run the project on our systems. So please tests that you have all dependencies added to your package.json files and commited.

Don't forget to:

- Run some prettier on your code
- Clean this readme before you submit your project

## Your project - TODO Name of the application

### Description

Find'it is an application designed for one purpose: helping hospital staff find medial items in a crouded storage room. To this effect, we implement a database of items, with pictures, id's, names, maps (where the items are located) and users. (Some features may break).
Items have x, y coordinates, which places them on their dedicated map. A map is the plan of a storage room.

### How to run it

#### Run Backend

1. `cd backend`
2. `npm i`
3. `npm start`

#### To run frontend do

1. `cd frontend`
2. `npm i`
3. `npm start`

You can see your api in url `http://localhost:3001/` and the web app frontend `http://localhost:3001/`

### Features

Working features:

- CRUD operations on three tables: users, items, maps
- beautiful animations, layout
- great code structure, strong
- Search by name
- a glorious and magnificent click-to-locate item on the map (try it!)
- we can upload images as binaries directly into SQLite DB

Broken features

- search results link to empty pages
- updating maps may fail (try reloading?)
- there are no 1-n relations in DB
- the wonderful click-to-locate item-on-map outputs unprecise locations (see for yourself)
- we cannot retrieve images from DB :(

### Epilogue

This project was heavily inspired by an earlier school project of the same name. Its homepage lives on [typedream](https://findit.typedream.app/), which aims to do exactly what this web app does. We originally built the app on [gilde](https://glideapps.com), and here is the result: [findit app](https://5yvgb768jbgv67.glide.page/).
Building this app in React tremendously developped our skills, such that we now feel ready to begin developping our own mobile app.
