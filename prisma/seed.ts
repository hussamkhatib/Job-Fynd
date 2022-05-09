import prisma from "../lib/prisma";
import { branches, companies, events, offers, students } from "./data";

const load = async () => {
  try {
    await prisma.offer.deleteMany();
    console.log("Deleted records in offer table");

    await prisma.student.deleteMany();
    console.log("Deleted records in student table");

    await prisma.company.deleteMany();
    console.log("Deleted records in company table");

    await prisma.event.deleteMany();
    console.log("Deleted records in event table");

    await prisma.branch.deleteMany();
    console.log("Deleted records in branch table");

    await prisma.$queryRaw`ALTER TABLE student AUTO_INCREMENT = 1`;
    console.log("reset product auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE company AUTO_INCREMENT = 1`;
    console.log("reset category auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE event AUTO_INCREMENT = 1`;
    console.log("reset category auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE offer AUTO_INCREMENT = 1`;
    console.log("reset category auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE branch AUTO_INCREMENT = 1`;
    console.log("reset category auto increment to 1");

    await prisma.branch.createMany({
      data: branches,
    });
    console.log("Added branches data");

    await prisma.offer.createMany({
      data: offers,
    });
    console.log("Added offers data");

    await prisma.student.createMany({
      data: students,
    });
    console.log("Added students data");

    await prisma.company.createMany({
      data: companies,
    });
    console.log("Added companies data");

    await prisma.event.createMany({
      data: events,
    });
    console.log("Added events data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
