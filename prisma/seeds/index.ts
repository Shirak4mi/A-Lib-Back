import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const user_status = await prisma.user_Status.createMany({
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

    const booking_status = await prisma.booking_Status.createMany({
      data: [{ name: "Pending" }, { name: "Confirmed" }, { name: "Completed" }, { name: "Cancelled" }],
      skipDuplicates: true,
    });

    const documet_types = await prisma.document_Type.createMany({
      data: [
        { name: "Dominican Id (Cédula)" },
        { name: "Drivers License" },
        { name: "Document Id" },
        { name: "Passport" },
        { name: "RNC" },
      ],
      skipDuplicates: true,
    });

    console.log({ documet_types, user_status, booking_status });
  } catch (e) {
    console.error(e);
  }
}

(async () => {
  await main();
  await prisma.$disconnect();
  process.exit();
})();
