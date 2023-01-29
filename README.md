# Minecraft Crafting Recipe

## Introduction

This website is made to search for crafting recipes of various items.
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

### Changing version

For adding recipes, follow the above instruction.

You should change version yourself on 2 files. One is `value/data.ts`, the other is `utils/converter.ts`.

- Change `MINECRAFT_VERSION` value on `value/data.ts`.
- Change `import textures from 'minecraft-textures/dist/textures/(version here)` line

## To-do

- [x] Add testing
- [x] Add open graph data
- [ ] Add more decorations
- [ ] Add favicon
- [ ] Add PWA support
- [ ] Add tooltip
