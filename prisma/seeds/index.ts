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

    const booking_status = await prisma.booking_Status.createMany({
      data: [{ name: "Pending" }, { name: "Confirmed" }, { name: "Completed" }, { name: "Cancelled" }],
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

    const provider_types = await prisma.provider_type.createMany({
      data: [{ name: "Google" }, { name: "Facebook" }],
      skipDuplicates: true,
    });

    const user_types = await prisma.user_type.createMany({
      data: [{ name: "Barber" }, { name: "Customer" }],
      skipDuplicates: true,
    });

    console.log({ documet_types, user_status, booking_status, token_types, provider_types, user_types });
  } catch (e) {
    console.error(e);
  }
}

(async () => {
  await main();
  await prisma.$disconnect();
  process.exit();
})();
