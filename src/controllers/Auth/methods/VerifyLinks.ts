import { BadRequestException } from "@/utils/error";
import { CommonTokenDTO } from "@/common/DTO";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "VerifyLink/:token",
  async ({ params: { token } }) => {
    try {
     



    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  { params: CommonTokenDTO }
);
