## Why I built the project this way

- The entire app is client side rendered. Server-side rendering is useless as there are no public pages.(login required).
- Using Components libraries like matarial UI, Chakra UI would had saved a lot of time and effort than to create my own components. As I was already using Tailwind, I was reluctant to add a component library on top of that. I ended up building up own component, documenting them using storybook. I used Headless UI and Radix UI for accessibility.
- I did not use any state management library, state management for data that comes from a server was done using react-query. For everything else react hooks were enough for me.
- Code-Splitting to reduce bundle size. (sample code: dashboard routes is common to both user with role "student" and "admin", Dynamically importing the user specific component using react.lazy, now the chart that is supposed to be rendered for the admin will never be bundled for the student)
- I was initially using Next.js API Routes, after realizing that I duplicating the same logic in every route, I switched to next-connect and hapi/Boom [sample code](). I later swicthed to trpc.

## Known Issues

- If user is not onboarded, redirecting to the onboarding page is handled on client-side. [code](https://github.com/hussamkhatib/Job-Fynd/blob/main/src/components/Layout.tsx).
  - Using middlewares is not possible as it is only supported for JWT strategy. [issue link](https://github.com/nextauthjs/next-auth/issues/4467)
  - using `getServerSideProps` can do the job,but I would need to add it on every possible route and make sure I dont forget it whenever I add a page.

# Built with

- Next.js
- tRPC
- typescript
- TailwindCSS
- storybook
- prisma
- PlanetScale
- react-query

# Getting Started

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
