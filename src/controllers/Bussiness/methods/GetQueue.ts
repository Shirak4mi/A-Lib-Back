import { IdBasedTokenDTO } from "@/common/DTO";
import { prisma } from "@/db";
import { InternalServerErrorException } from "@/utils/error";

import { Elysia } from "elysia";

export default new Elysia().get(
  "GetQueue/:id",
  async ({ params: { id } }) => {
    try {
      const businessQueues = await prisma.business.findMany({
        select: { Queue: { select: { id: true } } },
        where: { id },
      });

      if (!businessQueues) throw new InternalServerErrorException();

      return businessQueues;
    } catch (e) {
      throw e;
    }
  },
  { params: IdBasedTokenDTO }
);
