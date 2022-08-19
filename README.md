## Inroduction

Job Fynd a web app to manage all workflows in placement department of our college.

## Walkthrough

As a Admin  
`/dashboard`
![admin-dashboard](https://user-images.githubusercontent.com/52914487/185682953-65821291-b4fd-4150-9f26-0524321963a8.png)


`/students`
![admin-students](https://user-images.githubusercontent.com/52914487/185683096-084a3442-cef5-4719-bed1-00d097c12d2a.png)

`/students/offers`
![admin-student_offers](https://user-images.githubusercontent.com/52914487/185683204-ec5367ba-5224-40a1-ad7f-ea24c2871ce9.png)

`/students/validate`
![admin-student_validate](https://user-images.githubusercontent.com/52914487/185683288-c9fe1ec6-8780-4db4-83a1-569a3a4241e1.png)

`/students/:studentId`
![admin-students_:studentId](https://user-images.githubusercontent.com/52914487/185683350-d7c8c924-f61e-4ad9-b4bf-280411e3bf50.png)


`/events`
![admin_events](https://user-images.githubusercontent.com/52914487/185683491-8c4372d9-53f3-48e4-822a-0a2c5034762f.png)

`/events/new`
![admin-events_new](https://user-images.githubusercontent.com/52914487/185683580-7f112cdb-3a37-42a4-af2c-2ded41a9c888.png)

`/events/:eventId`
![admin--events_:eventId](https://user-images.githubusercontent.com/52914487/185683498-9f2a6be5-107a-4918-a01b-7f8182c8e302.png)

`/companies`
![admin-companies](https://user-images.githubusercontent.com/52914487/185683812-27fa2f12-c56b-4699-8578-f62391452af4.png)

`/companies/new`
![admin-companies_new](https://user-images.githubusercontent.com/52914487/185683815-197073f8-7b41-463c-9844-9c8866827cc4.png)



### As a student

`/getting-started`
![getting-started](https://user-images.githubusercontent.com/52914487/185683985-6f0d8573-13e0-42ae-bd4d-78502caa85f4.png)

`/dashboard`
![dashboard](https://user-images.githubusercontent.com/52914487/185683950-b60151aa-1e2c-4a89-b60d-c344868d9ae4.png)

`/profile/edit`
![student-profile_edit](https://user-images.githubusercontent.com/52914487/185684141-11aaa150-eab9-4404-8758-cf27235e5214.png)

`/profile/record/edit`
![student-profile_record_edit](https://user-images.githubusercontent.com/52914487/185684150-ebd0a196-14d5-4dc5-a9c6-84e1a377601f.png)

`/profile/documents/edit`
![student-profile_documents](https://user-images.githubusercontent.com/52914487/185684021-32c8ee6e-7143-4454-8e37-e8a38d02db8e.png)
![student-profile_documents_edit-dialog](https://user-images.githubusercontent.com/52914487/185684130-173b1d43-f8c4-497f-b38d-ea1aec27dacc.png)


`/events`
![student-events](https://user-images.githubusercontent.com/52914487/185684478-68140b41-aa02-40e5-9fc3-fc0b159e3585.png)

`/events/applied`
![student-events_applied](https://user-images.githubusercontent.com/52914487/185684525-69b763a0-1c04-478e-bc9f-5474ab2268a5.png)

`/events/offers`
![student-events_offers](https://user-images.githubusercontent.com/52914487/185684639-d0a0dfbb-fdc3-40bd-8888-3dcf8e52c8e7.png)

`/events/:eventId`
- profile not validated
![student-events_:eventId](https://user-images.githubusercontent.com/52914487/185684752-d226a5cf-1f58-40cb-a76c-9363603a7efe.png)
- student eligible
![student-events_:eventId2](https://user-images.githubusercontent.com/52914487/185684806-0c620d0f-75fb-45e3-a00b-5604f5a31ebf.png)
- student applied
![student-events_:eventId3](https://user-images.githubusercontent.com/52914487/185684867-7aaeac1f-00b4-4b96-81b6-2f4f6fa23562.png)





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
