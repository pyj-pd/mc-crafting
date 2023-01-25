# Minecraft Crafting Recipe

## Introduction

This website is made to search through crafting recipes of various items.
TypeScript and Next.js is used.

## Install

```
pnpm install
```

## Previewing

```
pnpm run dev
```

## Adding data

Minecraft file is located on `%appdata%/.minecraft/versions`.
Extract the `.jar` file that is inside the folder that is named the version you're trying to use.

### Adding recipe

After you extracted the `.jar` file, open the extracted folder. Find `data` folder inside it.
You will find two folders: `data/recipes` and `data/tags`. Copy these into the project folder. The directory is `data`. Program will do anything else for you then.

## To-do

- [ ] Add testing
- [ ] Add more decorations
