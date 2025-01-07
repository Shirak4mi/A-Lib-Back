import { InternalServerErrorException } from "@/utils/error";
import { IdBasedTokenDTO } from "@/common/DTO";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().get(
  "Find/:id",
  async ({ params: { id } }) => {
    try {
      const business = await prisma.business.findFirst({
        select: {
          name: true,
          email: true,
          address: true,
          description: true,
          phone_number: true,
          open_to: true,
          open_from: true,
          Owner: { select: { email: true } },
          Bussiness_Type: { select: { name: true } },
        },
        where: { id },
      });

      if (!business) throw new InternalServerErrorException("Cannot Find Business with this id!");

      return business;
    } catch (e) {
      throw e;
    }
  },
  { params: IdBasedTokenDTO }
);
