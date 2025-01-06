import { BadRequestException } from "@/utils/error";
import { sessionCookie } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

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
