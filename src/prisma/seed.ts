import prisma from "../lib/prisma";
import { users, events, companies } from "./data";

const load = async () => {
  try {
    await prisma.offer.deleteMany();
    console.log("Deleted records in offer table");
    await prisma.studentEnrollment.deleteMany();
    console.log("Deleted records in studentEnrollment table");
    await prisma.record.deleteMany();
    console.log("Deleted records in record table");
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
    await prisma.branch.deleteMany();
    console.log("Deleted records in branch table");
    await prisma.event.deleteMany();
    console.log("Deleted records in event table");
    await Promise.all(
      companies.map(async (company) => {
        await prisma.company.create({
          data: company,
        });
      })
    );
    const randomEvents = shuffle(events);
    await Promise.all(
      randomEvents.map(async (event) => {
        await prisma.event.create({
          data: event,
        });
      })
    );
    console.log("Added companies and randomEvents data");
    await Promise.all(
      users.map(async (user) => {
        await prisma.user.create({
          data: user,
        });
      })
    );
    console.log(
      "Added users,students,studentRecords,appliedJobs,offers,records"
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();

function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}
