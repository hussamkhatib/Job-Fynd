# Why I built the project this way

- The entire app is client side rendered.
- I was initially using Next.js API Routes, after realizing that I duplicating the same logic in every route, I switched to next-connect and hapi/Boom [sample code](). I later swicthed to trpc.
- Component libraries like matarial UI, Chakra UI are industry tested, provides a11y and save a lot of time for us, I instead choosed to create my own components as a learning exercise. While building them I used Storybook to test various states in isolation. A11y is hard, I used headless UI and Radix UI for it.
- I did not use state management library since most of the data management was done by react-query.
- Code-Splitting to reduce bundle size. (sample code: dashboard routes is common to both user with role "student" and "admin", Dynamically importing the user specific component using react.lazy, now the chart that is supposed to be rendered for the admin will never be bundled for the student)

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
