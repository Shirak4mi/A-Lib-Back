import { BadRequestException } from "@/utils/error";
import { sessionCookie } from "../dtos";

import { Elysia } from "elysia";
import { prisma } from "@/db";

export default new Elysia().post(
  "logout",
  async ({ cookie: { session } }) => {
    try {
      const id = session.value;
      const cookieSession = await prisma.session.delete({ where: { id } });
      if (!cookieSession) throw new BadRequestException("Could not delete cookie");
      return session.remove();
    } catch (e) {
      throw e;
    }
  },
  { cookie: sessionCookie }
);
