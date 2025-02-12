import { BadRequestException } from "@/utils/error";
import { CommonTokenDTO } from "@/common/DTO";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "VerifyLink/:token",
  async ({ params: { token: short_code } }) => {
    try {
      const isValidNano = await prisma.temporal_short_links.findFirst({
        where: { short_code },
        select: {
          expires_at: true,
          original_url: true,
          Type: { select: { id: true } },
          User: { select: { email: true } },
        },
      });
      if (!isValidNano) throw new BadRequestException("The Provided Token is not a valid One");

      console.log({ isValidNano });
      
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  { params: CommonTokenDTO }
);
