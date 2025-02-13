import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const user_status = await prisma.user_status.createMany({
      data: [
        { name: "Pending Validation" },
        { name: "Active" },
        { name: "Password Reset" },
        { name: "Inactive" },
        { name: "Blocked" },
        { name: "Pending Delete" },
        { name: "Deleted" },
      ],
      skipDuplicates: true,
    });

    const documet_types = await prisma.document_type.createMany({
      data: [
        { name: "Dominican Id (Cédula)" },
        { name: "Drivers License" },
        { name: "Document Id" },
        { name: "Passport" },
        { name: "RNC" },
      ],
      skipDuplicates: true,
    });

    const token_types = await prisma.token_type.createMany({
      data: [{ name: "loggin" }, { name: "verification" }, { name: "reset password" }],
      skipDuplicates: true,
    });

    const user_types = await prisma.user_type.createMany({
      data: [{ name: "Student" }, { name: "Speaker" }, { name: "Admin" }],
      skipDuplicates: true,
    });

    const book_status = await prisma.book_status.createMany({
      data: [{ name: "Avalibable" }, { name: "Out of Stock" }, { name: "Booked" }],
      skipDuplicates: true,
    });

    const study_room_status = await prisma.study_room_status.createMany({
      data: [{ name: "Avalibable" }, { name: "Booked" }, { name: "Out of Service" }],
      skipDuplicates: true,
    });

    console.log({
      study_room_status,
      documet_types,
      book_status,
      user_status,
      token_types,
      user_types,
    });
  } catch (e) {
    console.error(e);
  }
}

(async () => {
  await main();
  await prisma.$disconnect();
  process.exit();
})();
