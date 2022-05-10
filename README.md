# Built with

- Next.js
- typescript
- TailwindCSS
- storybook
- msw
- prisma
- PlanetScale

# Getting Started 

## Prerequisites
- Node.js 
- MySQL
- Yarn (recommended)
## Developement

Clone the repo

```bash
git clone https://github.com/hussamkhatib/tap.git
```

Go to the project directory
```bash
cd tap
```

Install packages with yarn
```bash
yarn
```

Create a .env file:
```bash
touch .env
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

## Working with msw
copy this to your .env file to enable msw 
```bash
NEXT_PUBLIC_API_MOCKING=enabled
```