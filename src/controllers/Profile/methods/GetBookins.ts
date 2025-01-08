import { UnauthorizedException } from "@/utils/error";
import { AddMetaData, getCurrentCursorOffSet } from "@/utils/functions";
import { sessionCookie } from "@/common/DTO";
import { GetBookinsQueryDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().get(
  "Bookins",
  async ({ cookie: { session }, query }) => {
    try {
      const validSession = await prisma.session.findUnique({
        select: { expires_at: true, user_id: true },
        where: { id: session.value },
      });

      if (!validSession) throw new UnauthorizedException("The requested session does not exists");

      const { page } = query;

      const [data, totalRegisters] = await prisma.$transaction([
        prisma.booking.findMany({
          where: { Booked_By: {} },
          take: 50,
          orderBy: { id: "asc" },
          skip: getCurrentCursorOffSet(page),
        }),
        prisma.booking.count({ where: { Booked_By: {} } }),
      ]);

      return AddMetaData(data, page, totalRegisters);
    } catch (e) {
      throw e;
    }
  },
  { cookie: sessionCookie, query: GetBookinsQueryDTO }
);
