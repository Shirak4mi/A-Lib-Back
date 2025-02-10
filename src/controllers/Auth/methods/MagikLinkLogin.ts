import { BadRequestException } from "@/utils/error";
import { userMagikLinkDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "MagickLink",
  async ({ body: { email } }) => {
    try {
      const existingMagikLinks = await prisma.temporal_short_links.findFirst({ where: { User: { email } } });
      if (existingMagikLinks) throw new BadRequestException("Already exists a Magic Link");
      


    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  { body: userMagikLinkDTO }
);
