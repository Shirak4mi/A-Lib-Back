import { session_cookie_name } from "@/utils/constants";
import { BadRequestException } from "@/utils/error";
import { sessionCookie } from "@/common/DTO";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "logout",
  async ({ cookie }) => {
    try {
      const id = cookie[session_cookie_name].value;
      const cookieSession = await prisma.session.delete({ where: { id } });
      if (!cookieSession) throw new BadRequestException("Could not delete cookie");
      return cookie[session_cookie_name].remove();
    } catch (e) {
      throw e;
    }
  },
  { cookie: sessionCookie }
);
