import prisma from "../lib/prisma";
import { companies, users } from "./data";

const load = async () => {
  try {
    await prisma.offer.deleteMany();
    console.log("Deleted records in offer table");

    await prisma.student_enrollment.deleteMany();
    console.log("Deleted records in student_enrollment table");

    await prisma.graduation.deleteMany();
    console.log("Deleted records in graduation table");

    await prisma.sslcpuc.deleteMany();
    console.log("Deleted records in sslcPuc table");

    await prisma.diploma.deleteMany();
    console.log("Deleted records in diploma table");

    await prisma.record.deleteMany();
    console.log("Deleted records in record table");

    await prisma.student.deleteMany();
    console.log("Deleted records in student table");

    await prisma.user.deleteMany();
    console.log("Deleted records in user table");

    await prisma.account.deleteMany();
    console.log("Deleted records in account table");

    await prisma.session.deleteMany();
    console.log("Deleted records in session table");

    await prisma.verificationToken.deleteMany();
    console.log("Deleted records in verificationToken table");

    await prisma.company.deleteMany();
    console.log("Deleted records in company table");

    await prisma.event.deleteMany();
    console.log("Deleted records in event table");

    await prisma.$queryRaw`ALTER TABLE company AUTO_INCREMENT = 1`;
    console.log("reset auto increment to 1 in company table");

    await prisma.$queryRaw`ALTER TABLE event AUTO_INCREMENT = 1`;
    console.log("reset auto increment to 1 in event table");

    await prisma.$queryRaw`ALTER TABLE offer AUTO_INCREMENT = 1`;
    console.log("reset auto increment to 1 in offer table");

    await prisma.$queryRaw`ALTER TABLE student_enrollment AUTO_INCREMENT = 1`;
    console.log("reset auto increment to 1 in student_enrollment table");

    await Promise.all(
      companies.map(async (company) => {
        await prisma.company.create({
          data: company,
        });
      })
    );

    console.log("Added companies data");

    await Promise.all(
      users.map(async (user) => {
        await prisma.user.create({
          data: user,
        });
      })
    );

    console.log("Added users data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
