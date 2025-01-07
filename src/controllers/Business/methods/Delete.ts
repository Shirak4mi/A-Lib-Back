import { InternalServerErrorException } from "@/utils/error";
import { IdBasedTokenDTO } from "@/common/DTO";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().delete(
  "Delete/:id",
  async ({ params: { id } }) => {
    try {
      const deletedBussiness = await prisma.business.delete({ where: { id } });
      if (!deletedBussiness) throw new InternalServerErrorException("No handled operation made, please check db!");
      return deletedBussiness;
    } catch (e) {
      throw e;
    }
  },
  { params: IdBasedTokenDTO }
);
