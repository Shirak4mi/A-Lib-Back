import { IdBasedTokenDTO } from "@/common/DTO";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().get(
  "GetQueue/:id",
  async ({ params: { id } }) => {
    try {
      
      const businessQueues = await prisma.business.findMany({
        select: { Queue: { select: { id: true } } },
        where: { id },
      });



    } catch (e) {
      throw e;
    }
  },
  { params: IdBasedTokenDTO }
);
