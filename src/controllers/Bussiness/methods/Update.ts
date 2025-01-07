import { InternalServerErrorException } from "@/utils/error";
import { IdBasedTokenDTO } from "@/common/DTO";
import { UpdateBussinessDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().patch(
  "Update/:id",
  async ({ params: { id }, body }) => {
    try {
      const updatedBussiness = await prisma.business.update({
        where: { id },
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
        data: {},
      });

      if (!updatedBussiness) throw new InternalServerErrorException();

      return updatedBussiness;
    } catch (e) {
      throw e;
    }
  },
  {
    params: IdBasedTokenDTO,
    body: UpdateBussinessDTO,
  }
);
