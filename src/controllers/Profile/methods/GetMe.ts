import { sessionCookie } from "@/common/DTO";
import { prisma } from "@/db";
import { session_cookie_name } from "@/utils/constants";
import { UnauthorizedException } from "@/utils/error";

import { Elysia } from "elysia";

export default new Elysia().get(
  "Me",
  async ({ cookie }) => {
    try {
      const id = cookie[session_cookie_name].value;
      const UserSession = await prisma.session.findFirst({
        where: { id },
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
              user_pictures: true,
              verified_email: true,
              Status: { select: { name: true } },
              User_Type: { select: { name: true } },
              Document_Type: { select: { name: true } },
            },
          },
        },
      });
      if (!UserSession) throw new UnauthorizedException("There's no such session");

      return UserSession.User;
    } catch (e) {
      throw e;
    }
  },
  { cookie: sessionCookie }
);
