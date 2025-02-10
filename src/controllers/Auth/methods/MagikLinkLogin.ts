import { userMagikLinkDTO } from "../dtos";
import { prisma } from "@/db";

import { Elysia } from "elysia";

export default new Elysia().post(
  "MagickLink",
  async ({ body: { email } }) => {
    try {
      // const existingMagikLinks = await prisma.temporal_short_links.findUnique({ where: {} });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  { body: userMagikLinkDTO }
);
