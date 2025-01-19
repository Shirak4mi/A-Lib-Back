import { sessionCookie } from "@/common/DTO";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().get(
  "Me",
  async ({ cookie: { session } }) => {
    try {
      







      return await prisma.session.findFirst({
        where: { id: session.value },
        select: {
          User: {
            select: {
              first_name: true,
              last_name: true,
              username: true,
              email: true,
              address: true,
              birth_date: true,
              document_id: true,
              phone_number: true,
              verified_email: true,
              Status: { select: { name: true } },
              User_Type: { select: { name: true } },
              Document_Type: { select: { name: true } },
            },
          },
        },
      });
    } catch (e) {
      throw e;
    }
  },
  { cookie: sessionCookie }
);
