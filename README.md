## Inroduction

Job Fynd a web app to manage all workflows in placement department of our college.

## Walkthrough

## Why I built the project this way

- The entire app is client side rendered. Server-side rendering is useless as there are no public pages.(login required).
- Using Components libraries like matarial UI, Chakra UI would had saved a lot of time and effort than to create my own components. As I was already using Tailwind, I was reluctant to add a component library on top of that. I ended up building up own component, documenting them using storybook. I used Headless UI and Radix UI for accessibility.
- I did not use any state management library, state management for data that comes from a server was done using react-query. For everything else react hooks were enough for me.
- Code-Splitting to reduce bundle size. [sample code](https://github.com/hussamkhatib/Job-Fynd/blob/de1552d307295ae57d6d2664e8a4555709860a65/src/pages/dashboard.tsx)
- I was initially using Next.js API Routes, after realizing that I duplicating the same logic in every route, I switched to next-connect where I could add middlewares to do the repetitive work. [sample code](https://github.com/hussamkhatib/Job-Fynd/blob/b9aaea7fa66f7e71fb50e039d82dab00e9f0123e/util/server.ts). I later switched to trpc for typesafe APIs.

## Built with

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io/)
- [React Query](https://react-query-v3.tanstack.com/)
- [Tailwind](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Cloudinary](https://cloudinary.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [visx](https://airbnb.io/visx/)

## Prerequisites

- Node.js
- MySQL
- Yarn (recommended)

## Developement

Clone the repo

```bash
git clone https://github.com/hussamkhatib/Job-Fynd.git
```

Go to the project directory

```bash
cd Job-Fynd
```

Install packages with yarn

```bash
yarn
```

Create a .env file:

```bash
cp .env.example .env
```

Then, update the DATABASE_URL property with the following format.

```bash
mysql://<USERNAME>:<PLAIN_TEXT_PASSWORD>@<ACCESS_HOST_URL>/<DATABASE_NAME>?sslaccept=strict
```

### Setup initial data

populating your database with some data.

```bash
npx prisma db seed
```

open Prisma Studio to look at the populated data

```bash
npx prisma studio
```

### Run frontend

```bash
yarn dev
```

### Run Storybook

```bash
yarn storybook
```

## Working with PlanetScale

- install [PlanetScale CLI](https://github.com/planetscale/cli#installation)
- Sign up and create a database from PlanetScale Dashboard.
- modify your DATABASE_URL in your .env to `'mysql://root@127.0.0.1:3309/<DATABASE_NAME>'`
- login

```
pscale auth login
```

- create a branch

```bash
pscale branch create <database_name> <branch_name>
```

- connect to PlanetScale

```bash
pscale connect <database_name> <branch_name> --port 3309
```

- open a new terminal when you want to push your prisma schema changes.

```bash
npx prisma db push
```

if your are stuck anywhere, checkout the [docs](https://docs.planetscale.com/tutorials/prisma-quickstart#connect-to-planetscale).
